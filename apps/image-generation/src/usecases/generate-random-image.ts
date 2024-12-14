import { GeneratedImage, ImagePrompt } from '../domain/entities/generation-result'

export function generateRandomImageUsecase(deps: {
  generateSeedWords: () => Promise<string[]>
  generatePromptFromSeedWords: (seedWords: string[]) => Promise<ImagePrompt>
  generateImage: (prompt: string) => Promise<GeneratedImage>
}) {
  return async (): Promise<{
    prompt: ImagePrompt
    image: GeneratedImage
  }> => {
    const seedWords = await deps.generateSeedWords()
    const prompt = await deps.generatePromptFromSeedWords(seedWords)
    const imageGenerationResult = await deps.generateImage(prompt.text)

    return {
      prompt,
      image: imageGenerationResult,
    }
  }
}
