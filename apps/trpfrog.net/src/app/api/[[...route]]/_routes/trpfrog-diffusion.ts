import { trpfrogDiffusionClient } from '@trpfrog.net/image-generation'
import { Hono } from 'hono'

import { env } from '@/env/server'

export const app = new Hono().post('/update', async c => {
  const res = await trpfrogDiffusionClient.update
    .$post({
      header: {
        'x-api-key': env.TRPFROG_FUNCTIONS_SECRET!,
      },
    })
    .then(res => res.json())
  return c.json(res)
})
