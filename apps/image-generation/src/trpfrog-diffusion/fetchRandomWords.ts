import { z } from 'zod'

export async function fetchRandomWords(amount: number): Promise<string[]> {
  const apiUrl = 'https://random-word-api.herokuapp.com'
  const response = await fetch(`${apiUrl}/word?number=${amount}&lang=en`)
  return z
    .string()
    .array()
    .length(amount)
    .parse(await response.json())
}
