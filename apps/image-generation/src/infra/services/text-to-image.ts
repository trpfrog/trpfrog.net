import {
  createPartFromBase64,
  createUserContent,
  GenerateContentResponse,
  GoogleGenAI,
  PartUnion,
  ApiError,
} from '@google/genai'
import { getContext } from 'hono/context-storage'

import { GeneratedImage } from '../../domain/entities/generation-result'
import {
  InvalidTextToImageInputError,
  TextToImage,
  UnexpectedTextToImageModelResponseError,
} from '../../domain/services/text-to-image'
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

export function createGeminiImageGenerator(params: {
  modelName: string
  apiKey?: string
}): TextToImage {
  return async (text: string, inputImageBase64?: string[]): Promise<GeneratedImage> => {
    const c = getContext<Env>()
    const apiKey = params.apiKey ?? c.env.GEMINI_API_KEY
    const ai = new GoogleGenAI({ apiKey })

    // Embed text and images into the prompt
    const userContents: PartUnion[] = [text]
    if (inputImageBase64) {
      inputImageBase64.forEach(image => {
        userContents.push(createPartFromBase64(image, 'image/png'))
      })
    }

    // Inference (no retry here)
    const response = await ai.models
      .generateContent({
        model: params.modelName,
        contents: [createUserContent(userContents)],
      })
      .catch(e => {
        // 入力が不正（クライアント側の問題）
        if (e instanceof ApiError && e.status >= 400 && e.status < 500) {
          console.error(
            `Gemini client error (${e.status}). Abort without retry.\nRequest:`,
            text,
            '\nError:',
            e,
          )
          throw new InvalidTextToImageInputError('Invalid input for Gemini TextToImage', {
            cause: e,
          })
        }
        console.error('Gemini unexpected error:', e, '\nRequest:', text)
        throw new UnexpectedTextToImageModelResponseError(
          'Unexpected error from Gemini TextToImage',
          { cause: e },
        )
      })

    // Extract images
    const imagePart = getImagePartFromResponse(response)
    if (!imagePart?.base64) {
      console.error('Gemini returned no image or it was filtered')
      throw new UnexpectedTextToImageModelResponseError('Model returned no image')
    }
    const { base64, mimeType = 'image/png' } = imagePart

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
      throw new UnexpectedTextToImageModelResponseError('Invalid base64 image from model', {
        cause: e,
      })
    }

    return {
      image: arrayBuffer,
      modelName: params.modelName,
      extension: '.' + (mimeType.split('/')[1] ?? 'png'),
    }
  }
}
