import {
  ImageGenerationResult,
  RandomImageGenerationResult,
  TrpFrogImagePrompt,
} from '@/domain/entities/generation-result'

export function usecase_generateRandomImage(deps: {
  generateSeedWords: () => Promise<string[]>
  generatePromptFromSeedWords: (seedWords: string[]) => Promise<TrpFrogImagePrompt>
  generateImage: (prompt: string) => Promise<ImageGenerationResult>
}) {
  return async (): Promise<RandomImageGenerationResult> => {
    const seedWords = await deps.generateSeedWords()
    const { prompt, translated } = await deps.generatePromptFromSeedWords(seedWords)
    const imageGenerationResult = await deps.generateImage(prompt)
    return {
      prompt,
      translated,
      ...imageGenerationResult,
    }
  }
}
