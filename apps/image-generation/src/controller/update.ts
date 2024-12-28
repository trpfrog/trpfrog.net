import { zValidator } from '@hono/zod-validator'
import { stringifiedBooleanSchema } from '@trpfrog.net/utils/zod'
import { Hono } from 'hono'
import { z } from 'zod'

import { Env } from '../env'
import { waitUntilIfSupported } from '../lib/waitUntilIfSupported'

import { requiresApiKey } from './middlewares'

export const updateApp = new Hono<Env>().post(
  '/',
  requiresApiKey(),
  zValidator(
    'query',
    z.object({
      force: stringifiedBooleanSchema,
    }),
  ),
  async c => {
    const forceUpdate = c.req.valid('query').force
    const shouldUpdate = await c.var.UCS.shouldUpdate({ forceUpdate })
    if (!shouldUpdate.shouldUpdate) {
      return c.json(
        {
          status: 'skipped',
          message: shouldUpdate.message,
        },
        200,
      )
    }

    waitUntilIfSupported(c.var.UCS.refreshImageIfStale({ forceUpdate: true }))
    return c.json(
      {
        status: 'accepted',
      },
      202, // Accepted
    )
  },
)
