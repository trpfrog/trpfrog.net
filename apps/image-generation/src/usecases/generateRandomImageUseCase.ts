import { GeneratedImage, ImageBrief, ImagePrompt } from '../domain/entities/generation-result'

export function generateRandomImageUseCase(deps: {
  generateSeedWords: () => Promise<string[]>
  generatePromptFromSeedWords: (
    seedWords: string[],
  ) => Promise<ImagePrompt & { brief?: ImageBrief }>
  generateImage: (prompt: string | ImageBrief) => Promise<GeneratedImage>
}) {
  return async (): Promise<{
    prompt: ImagePrompt
    image: GeneratedImage
  }> => {
    const seedWords = await deps.generateSeedWords()
    const { brief, ...prompt } = await deps.generatePromptFromSeedWords(seedWords)
    const imageGenerationResult = await deps.generateImage(brief ?? prompt.text)

    return {
      prompt,
      image: imageGenerationResult,
    }
  }
}
