import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import * as v from 'valibot'

import { StringifiedBooleanSchema } from '@trpfrog.net/utils/valibot'

import { Env } from '../env'
import { waitUntilIfSupported } from '../lib/waitUntilIfSupported'
import { requiresApiKey } from './middlewares'

export const updateApp = new Hono<Env>().post(
  '/',
  requiresApiKey(),
  sValidator(
    'query',
    v.object({
      force: StringifiedBooleanSchema,
      wait: StringifiedBooleanSchema,
    }),
  ),
  async c => {
    const { force: forceUpdate, wait } = c.req.valid('query')
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

    const refresh = c.var.UCS.refreshImageIfStale({ forceUpdate: true })
    if (wait) {
      return c.json(await refresh, 200)
    }

    waitUntilIfSupported(refresh)
    return c.json(
      {
        status: 'accepted',
      },
      202, // Accepted
    )
  },
)
