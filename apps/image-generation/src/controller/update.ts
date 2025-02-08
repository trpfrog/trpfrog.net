import { vValidator } from '@hono/valibot-validator'
import { StringifiedBooleanSchema } from '@trpfrog.net/utils/valibot'
import { Hono } from 'hono'
import * as v from 'valibot'

import { Env } from '../env'
import { waitUntilIfSupported } from '../lib/waitUntilIfSupported'

import { requiresApiKey } from './middlewares'

export const updateApp = new Hono<Env>().post(
  '/',
  requiresApiKey(),
  vValidator(
    'query',
    v.object({
      force: StringifiedBooleanSchema,
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
