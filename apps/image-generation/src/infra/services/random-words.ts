import { createURL } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { RandomWordGenerator } from '../../domain/services/random-words'

export const randomWordApi: RandomWordGenerator = async amount => {
  const url = createURL('/api', 'https://random-word-api.vercel.app', {
    words: amount.toString(),
  })
  const response = await fetch(url).then(res => res.json())

  // prettier-ignore
  return v.parse(
    v.pipe(
      v.array(v.string()), 
      v.length(amount)
    ), 
    response
  )
}
