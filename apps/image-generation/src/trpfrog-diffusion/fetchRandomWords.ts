import { z } from 'zod'

export async function fetchRandomWords(amount: number): Promise<string[]> {
  const response = await fetch(`https://random-word-api.vercel.app/api?words=${amount}`)
  return z
    .string()
    .array()
    .length(amount)
    .parse(await response.json())
}
