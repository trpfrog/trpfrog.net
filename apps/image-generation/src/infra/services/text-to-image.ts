import {
  createPartFromBase64,
  createUserContent,
  GenerateContentResponse,
  GoogleGenAI,
  PartUnion,
} from '@google/genai'
import { getContext } from 'hono/context-storage'
import pRetry from 'p-retry'

import { GeneratedImage } from '../../domain/entities/generation-result'
import { Env } from '../../env'

function getImagePartFromResponse(
  resp: GenerateContentResponse,
): { base64: string; mimeType?: string } | undefined {
  const parts = resp?.candidates?.[0]?.content?.parts ?? []
  for (const part of parts) {
    if (part.inlineData) {
      const base64 = part.inlineData.data
      if (base64 != null) {
        return { base64, mimeType: part.inlineData.mimeType }
      }
    } else if (part.text) {
      console.log(part.text)
    }
  }
}

export function createGeminiImageGenerator(params: { modelName: string; apiKey?: string }) {
  return async (text: string, inputImageBase64?: string[]): Promise<GeneratedImage> => {
    const c = getContext<Env>()
    const apiKey = params.apiKey ?? c.env.HUGGINGFACE_TOKEN
    const ai = new GoogleGenAI({ apiKey })

    // Embed text and images into the prompt
    const userContents: PartUnion[] = [text]
    if (inputImageBase64) {
      inputImageBase64.forEach(image => {
        userContents.push(createPartFromBase64(image, 'image/png'))
      })
    }

    // Inference
    const inference = async () => {
      const response = await ai.models
        .generateContent({
          model: params.modelName,
          contents: [createUserContent(userContents)],
          config: {
            responseMimeType: 'image/png',
          },
        })
        .catch(e => {
          console.error('Internal Error in Gemini:', e, '\nRequest:', text)
          throw e
        })

      // Extract images
      const imagePart = getImagePartFromResponse(response)
      if (!imagePart?.base64) {
        console.error('Gemini returned no image or it was filtered')
        throw new Error('Failed to generate image')
      }
      return imagePart
    }

    const result = await pRetry(inference, {
      retries: 2,
      onFailedAttempt: ({ error, attemptNumber, retriesLeft }) => {
        console.warn(
          `[Gemini] Attempt ${attemptNumber} failed: ${error.message}. Retries left: ${retriesLeft}`,
        )
      },
    })
      .then(res => ({ success: true as const, data: res }))
      .catch(err => ({ success: false as const, error: err }))

    if (!result.success) {
      console.error('Gemini image generation failed:', result.error)
      throw new Error('Failed to generate image')
    }
    const { base64, mimeType = 'image/png' } = result.data

    // Decode base64 to ArrayBuffer using atob (Workers)
    let arrayBuffer: ArrayBuffer
    try {
      const binary = atob(base64)
      const len = binary.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
      arrayBuffer = bytes.buffer
    } catch (e) {
      console.error('Failed to decode base64 image:', e)
      throw new Error('Failed to generate image')
    }

    return {
      image: arrayBuffer,
      modelName: params.modelName,
      extension: '.' + (mimeType.split('/')[1] ?? 'png'),
    }
  }
}
