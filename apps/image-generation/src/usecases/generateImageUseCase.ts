import pRetry, { AbortError } from 'p-retry'

import skillMarkdown from '../../skills/tsmami-image/SKILL.md?raw'
import type { ImageBrief } from '../domain/entities/generation-result'
import { InvalidTextToImageInputError, TextToImage } from '../domain/services/text-to-image'
import { createTsmamiPromptBuilder } from '../domain/services/tsmami-prompt'

/** プロンプトの文面は配布用スキルの SKILL.md だけで管理し、ビルド時に読み込む */
export const buildTsmamiImagePrompt = createTsmamiPromptBuilder(skillMarkdown)

export function generateImageUseCase(deps: {
  textToImage: TextToImage
  /** つまみさんの参照画像 (PNG) の base64 */
  referenceImageBase64: string
}) {
  return async (caption: string, brief?: ImageBrief) => {
    const prompt = buildTsmamiImagePrompt(caption, brief)

    try {
      const attempt = async () => {
        try {
          return await deps.textToImage(prompt, [deps.referenceImageBase64])
        } catch (e) {
          if (e instanceof InvalidTextToImageInputError) {
            // 入力起因のエラーはリトライしない
            throw new AbortError(e)
          }
          throw e
        }
      }

      return await pRetry(attempt, {
        retries: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
        onFailedAttempt: ({ error, attemptNumber, retriesLeft }) => {
          console.warn(
            `[TextToImage] Attempt ${attemptNumber} failed: ${error.message}. Retries left: ${retriesLeft}`,
          )
        },
      })
    } catch (e) {
      console.error(e)
      throw new Error('Failed to generate image')
    }
  }
}
