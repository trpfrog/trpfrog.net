'use server'

import { createURL } from '@trpfrog.net/utils'

import { env } from '@/env'

export async function revalidate(origin: string, type: 'path' | 'tag', key: string) {
  const url = createURL('/api/revalidate', origin)
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
