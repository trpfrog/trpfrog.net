import { generateRandomTrpFrogPrompt } from './generateRandomPrompt'

import type { TrpFrogImageGenerationResult } from '@/domain/entities/generation-result'

import { Deps } from '@/domain/deps'

export async function generateNewImage(
  deps: Deps<'fetchRandomWords' | 'generateImage' | typeof generateRandomTrpFrogPrompt>,
  options?: {
    numberOfRetries?: number
  },
): Promise<TrpFrogImageGenerationResult> {
  const numberOfRetries = options?.numberOfRetries ?? 1

  for (const _ of Array.from(Array(numberOfRetries))) {
    try {
      const randomWords = await deps.fetchRandomWords(10)
      const { prompt, translated } = await generateRandomTrpFrogPrompt(deps, randomWords)
      const arrayBuffer = await deps.generateImage(prompt)
      return {
        generatedTime: Date.now(),
        arrayBuffer,
        prompt,
        translated,
      }
    } catch (e) {
      console.error(e)
      continue
    }
  }
  throw new Error('Failed to generate image')
}
