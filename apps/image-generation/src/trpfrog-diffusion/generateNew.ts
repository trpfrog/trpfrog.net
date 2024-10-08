import { fetchRandomWords } from './fetchRandomWords'
import { generateRandomTrpFrogPrompt } from './generateRandomPrompt'
import { generateTrpFrogImage } from './generateTrpFrogImage'

import type { TrpFrogImageGenerationResult } from './schema'

export async function generateNew(options: {
  numberOfRetries?: number
  openaiApiKey: string
  hfToken: string
}): Promise<TrpFrogImageGenerationResult> {
  let base64 = ''
  let prompt = ''
  let translated = ''
  let arrayBuffer: ArrayBuffer | undefined
  const numberOfRetries = options?.numberOfRetries ?? 1
  for (const _ of Array.from(Array(numberOfRetries))) {
    try {
      const randomWords = await fetchRandomWords(10)
      const promptRes = await generateRandomTrpFrogPrompt(randomWords, options.openaiApiKey)
      prompt = promptRes.prompt
      translated = promptRes.translated
      const result = await generateTrpFrogImage(prompt, options.hfToken)
      if (!result.success) {
        continue
      }
      base64 = result.base64
      arrayBuffer = result.arrayBuffer
    } catch (e) {
      console.error(e)
      continue
    }
    break
  }

  if (base64 === '' || !arrayBuffer) {
    throw new Error('Failed to generate image')
  }

  return {
    generatedTime: Date.now(),
    arrayBuffer,
    prompt,
    translated,
    base64,
  }
}
