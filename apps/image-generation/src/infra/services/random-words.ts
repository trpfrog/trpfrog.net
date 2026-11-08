import * as v from 'valibot'

import { createURL, typedObjectEntries, validateUnknown } from '@trpfrog.net/utils'

import { PartOfSpeech, RandomWordGenerator } from '../../domain/services/random-words'

// 長い語は絵にしにくい専門用語 (nucleotidase など) に偏りがちなので避ける
const MIN_WORD_LENGTH = 3
const MAX_WORD_LENGTH = 10

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

export const randomWordApi: RandomWordGenerator = async mix => {
  const words = await Promise.all(
    typedObjectEntries(mix).map(([type, count]) => fetchWords(type, count)),
  )
  return words.flat()
}
