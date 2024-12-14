export function generateRandomWordsUseCase(deps: { generateSeedWords: () => Promise<string[]> }) {
  return async (): Promise<string[]> => {
    const rawWords = await deps.generateSeedWords()
    return rawWords.map(word => word.trim()).filter(word => word.length > 0)
  }
}
