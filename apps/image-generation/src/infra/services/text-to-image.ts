import { type OpenAIImageModelEditOptions } from '@ai-sdk/openai'
import { APICallError, generateImage, type GenerateImageResult } from 'ai'

import { GeneratedImage } from '../../domain/entities/generation-result'
import {
  InvalidTextToImageInputError,
  TextToImage,
  UnexpectedTextToImageModelResponseError,
} from '../../domain/services/text-to-image'
import { createOpenAIClient } from './openai-client'

type OpenAIImageGeneratorParams = {
  modelName: string
  size?: `${number}x${number}`
  quality?: OpenAIImageModelEditOptions['quality']
  /** 1 回の生成で待つ上限 */
  timeoutMs: number
  apiKey?: string
}

function logUsage(modelName: string, result: GenerateImageResult) {
  const usage = result.calls.map(call => call.usage)
  console.log(`[TextToImage] ${modelName} usage:`, JSON.stringify(usage))
}

export function createOpenAIImageGenerator(params: OpenAIImageGeneratorParams): TextToImage {
  return async (text: string, inputImagesBase64?: string[]): Promise<GeneratedImage> => {
    const openai = createOpenAIClient(params.apiKey)

    // 参照画像がある場合は /images/edits が使われる
    const images = inputImagesBase64 ?? []
    const result = await generateImage({
      model: openai.image(params.modelName),
      prompt: images.length > 0 ? { text, images } : text,
      size: params.size,
      // リトライは usecase 側で制御する
      maxRetries: 0,
      abortSignal: AbortSignal.timeout(params.timeoutMs),
      providerOptions: {
        openai: {
          quality: params.quality,
          outputFormat: 'png',
        } satisfies OpenAIImageModelEditOptions,
      },
    }).catch(e => {
      // リトライしても結果が変わらないエラー（入力不正・モデレーション拒否など）
      if (
        APICallError.isInstance(e) &&
        e.statusCode != null &&
        e.statusCode >= 400 &&
        !e.isRetryable
      ) {
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

    const file = result.image
    if (file.uint8Array.byteLength === 0) {
      throw new UnexpectedTextToImageModelResponseError('Model returned no image')
    }

    return {
      image: new Uint8Array(file.uint8Array).buffer,
      modelName: params.modelName,
      extension: '.png',
    }
  }
}
