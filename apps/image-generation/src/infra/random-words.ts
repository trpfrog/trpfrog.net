import { createURL } from '@trpfrog.net/utils'
import { z } from 'zod'

import { RandomWordGenerator } from '@/domain/random-words'

export const randomWordApi: RandomWordGenerator = async amount => {
  const url = createURL('/api', 'https://random-word-api.vercel.app', {
    words: amount.toString(),
  })
  const response = await fetch(url)
  return z
    .string()
    .array()
    .length(amount)
    .parse(await response.json())
}
