import { createURL, validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { RandomWordGenerator } from '../../domain/services/random-words'

const AmountLimitedStringArraySchema = (amount: number) =>
  v.pipe(v.array(v.string()), v.length(amount))

export const randomWordApi: RandomWordGenerator = async amount => {
  const url = createURL('/api', 'https://random-word-api.vercel.app', {
    words: amount.toString(),
  })
  const response = await fetch(url).then(res => res.json())

  const schema = AmountLimitedStringArraySchema(amount)
  return validateUnknown(schema, response)
}
