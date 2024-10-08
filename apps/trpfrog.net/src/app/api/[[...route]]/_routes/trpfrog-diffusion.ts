import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { Hono } from 'hono'

import { env } from '@/env/server'

const imgGenClient = createTrpFrogImageGenerationClient(env.NODE_ENV)

export const app = new Hono().post('/update', async c => {
  if (!env.TRPFROG_FUNCTIONS_SECRET) {
    return c.json({ message: 'TRPFROG_FUNCTIONS_SECRET is not set' }, 503)
  }

  const res = await imgGenClient.update
    .$post({
      header: {
        'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
      },
    })
    .then(res => res.json())

  return c.json(res)
})
