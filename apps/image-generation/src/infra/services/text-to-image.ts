import { createOpenAI, type OpenAIImageModelEditOptions } from '@ai-sdk/openai'
import { APICallError, generateImage, type GenerateImageResult } from 'ai'
import { getContext } from 'hono/context-storage'

import { GeneratedImage } from '../../domain/entities/generation-result'
import {
  InvalidTextToImageInputError,
  TextToImage,
  UnexpectedTextToImageModelResponseError,
} from '../../domain/services/text-to-image'
import { Env } from '../../env'

type OpenAIImageGeneratorParams = {
  modelName: string
  size?: `${number}x${number}`
  quality?: OpenAIImageModelEditOptions['quality']
  complexity?: OpenAIImageModelEditOptions['complexity']
  apiKey?: string
}

/**
 * 4xx のうち、リトライしても結果が変わらないもの（入力不正・モデレーション拒否など）か判定する。
 * 408 (timeout) と 429 (rate limit) は一時的なエラーなのでリトライ対象にする。
 */
function isNonRetryableClientError(e: unknown): e is APICallError {
  if (!APICallError.isInstance(e) || e.statusCode == null) return false
  const status = e.statusCode
  return status >= 400 && status < 500 && status !== 408 && status !== 429
}

function logUsage(modelName: string, result: GenerateImageResult) {
  const usage = result.calls.map(call => call.usage)
  console.log(`[TextToImage] ${modelName} usage:`, JSON.stringify(usage))
}

export function createOpenAIImageGenerator(params: OpenAIImageGeneratorParams): TextToImage {
  return async (text: string, inputImagesBase64?: string[]): Promise<GeneratedImage> => {
    const c = getContext<Env>()
    const openai = createOpenAI({ apiKey: params.apiKey ?? c.env.OPENAI_API_KEY })

    // 参照画像がある場合は /images/edits が使われる
    const images = inputImagesBase64 ?? []
    const result = await generateImage({
      model: openai.image(params.modelName),
      prompt: images.length > 0 ? { text, images } : text,
      size: params.size,
      // リトライは usecase 側で制御する
      maxRetries: 0,
      providerOptions: {
        openai: {
          quality: params.quality,
          complexity: params.complexity,
          outputFormat: 'png',
        } satisfies OpenAIImageModelEditOptions,
      },
    }).catch(e => {
      if (isNonRetryableClientError(e)) {
        console.error(
          `OpenAI image client error (${e.statusCode}). Abort without retry.\nRequest:`,
          text,
          '\nResponse:',
          e.responseBody,
        )
        throw new InvalidTextToImageInputError('Invalid input for OpenAI TextToImage', {
          cause: e,
        })
      }
      console.error('OpenAI image unexpected error:', e)
      throw new UnexpectedTextToImageModelResponseError(
        'Unexpected error from OpenAI TextToImage',
        { cause: e },
      )
    })

    for (const warning of result.warnings) {
      console.warn('[TextToImage] warning:', JSON.stringify(warning))
    }
    logUsage(params.modelName, result)

    const file = result.images[0]
    if (!file || file.uint8Array.byteLength === 0) {
      throw new UnexpectedTextToImageModelResponseError('Model returned no image')
    }

    const subtype = file.mediaType.split('/')[1] ?? 'png'
    return {
      image: new Uint8Array(file.uint8Array).buffer,
      modelName: params.modelName,
      extension: '.' + subtype,
    }
  }
}
