import * as v from 'valibot'

import { createURL, validateUnknown } from '@trpfrog.net/utils'

import { PartOfSpeech, RandomWordGenerator, WordMix } from '../../domain/services/random-words'

// 絵にしにくい専門用語 (nucleotidase など) を避ける
const MIN_WORD_LENGTH = 3
const MAX_WORD_LENGTH = 12

const WordsResponseSchema = (count: number) =>
  v.pipe(v.array(v.object({ word: v.string() })), v.length(count))

async function fetchWords(type: PartOfSpeech, count: number): Promise<string[]> {
  const url = createURL('/api/words', 'https://randomapi.dev', {
    type,
    count: count.toString(),
    minLength: MIN_WORD_LENGTH.toString(),
    maxLength: MAX_WORD_LENGTH.toString(),
    fields: 'word',
    unwrap: 'true',
  })
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`randomapi.dev responded with ${res.status}: ${await res.text()}`)
  }
  return validateUnknown(WordsResponseSchema(count), await res.json()).map(({ word }) => word)
}

export const randomWordApi: RandomWordGenerator = async (mix: WordMix) => {
  const words = await Promise.all(
    (Object.entries(mix) as [PartOfSpeech, number][]).map(([type, count]) =>
      fetchWords(type, count),
    ),
  )
  return words.flat()
}
