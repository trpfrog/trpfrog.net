'use server'

import { services } from '@trpfrog.net/constants'
import { createURL } from '@trpfrog.net/utils'

import { clientEnv } from '@/clientEnv'
import { env } from '@/env'

const url = createURL('/api/revalidate', services.website.origin(clientEnv.NODE_ENV))

export async function revalidate(type: 'path' | 'tag', key: string) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.TRPFROG_ADMIN_KEY,
    },
    body: JSON.stringify({ [type]: key }),
  }).then(res => {
    return res.ok
  })
}
