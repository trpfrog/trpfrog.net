import { TextToImage } from '../domain/services/text-to-image'

import type { ImageGenerationResult } from '../domain/entities/generation-result'

export function generateImageUsecase(deps: { textToImage: TextToImage }) {
  return async (
    prompt: string,
    options: { numberOfRetries: number },
  ): Promise<ImageGenerationResult> => {
    const numberOfRetries = options?.numberOfRetries ?? 1
    for (const _ of Array.from(Array(numberOfRetries))) {
      try {
        const arrayBuffer = await deps.textToImage(prompt)
        return {
          generatedTime: Date.now(),
          arrayBuffer,
        }
      } catch (e) {
        console.error(e)
        continue
      }
    }
    throw new Error('Failed to generate image')
  }
}
