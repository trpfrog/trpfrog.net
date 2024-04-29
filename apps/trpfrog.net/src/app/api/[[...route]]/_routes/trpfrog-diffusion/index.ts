import { zValidator } from '@hono/zod-validator'
import { createURL } from '@trpfrog.net/utils'
import { get } from '@vercel/edge-config'
import { kv } from '@vercel/kv'
import { Hono } from 'hono'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'

import {
  HOST_URL,
  TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS,
  TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY,
} from '@/lib/constants.ts'

import { TrpFrogImageGenerationResult, TrpFrogImageGenerationResultSchema } from './schema'

import { env } from '@/env/server.ts'


const TRPFROG_DIFFUSION_KV_KEY = 'trpfrog-diffusion'

const POST_CALLBACK_URL = createURL('/api/trpfrog-diffusion', HOST_URL, {
  token: env.TRPFROG_ADMIN_KEY,
})

const IMAGE_GENERATION_ENDPOINT =
  'https://asia-northeast1-trpfrog-net.cloudfunctions.net/update-trpfrog-diffusion'

const cache = new LRUCache<typeof TRPFROG_DIFFUSION_KV_KEY, TrpFrogImageGenerationResult>({
  max: 1,
  // local TTL 3 minutes (KV's TTL is TRPFROG_DIFFUSION_UPDATE_HOURS)
  ttl: env.NODE_ENV === 'development' ? undefined : 1000 * 60 * 3,

  allowStale: true,
  noDeleteOnFetchRejection: true,
  allowStaleOnFetchRejection: true,
  allowStaleOnFetchAbort: true,
})

async function getCache() {
  const key = TRPFROG_DIFFUSION_KV_KEY
  const record = await kv.get<TrpFrogImageGenerationResult>(key)
  if (env.NODE_ENV === 'development') {
    return record as unknown as TrpFrogImageGenerationResult
  }

  const trpfrogDiffusionUpdateHours =
    (await get<number>(TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY)) ??
    TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS

  const kvTtl = trpfrogDiffusionUpdateHours * 60 * 60 * 1000
  if (!record || Date.now() - record.generatedTime > kvTtl) {
    // Temporarily mark the stale value as up-to-date to prevent others from updating it.
    await kv.set(key, {
      ...(record ?? {}),
      generatedTime: Date.now(),
    })

    await fetch(IMAGE_GENERATION_ENDPOINT, {
      headers: {
        'X-Api-Token': env.TRPFROG_FUNCTIONS_SECRET!,
        'X-Callback-Url': POST_CALLBACK_URL,
      },
    })
  }

  // ignore type error because it happens only first time
  cache.set(key, record as unknown as TrpFrogImageGenerationResult)
  return record as unknown as TrpFrogImageGenerationResult
}

export const app = new Hono()
  .get('/', async c => {
    const cached = await getCache()
    if (!cached) {
      return c.json(
        {
          error: 'Internal Server Error, please try again later.',
        },
        500,
      )
    }
    if (!cached.base64) {
      if (cached.generatedTime) {
        return c.json(
          {
            info: 'Image generation is in progress, please try again later.',
          },
          202,
        )
      } else {
        return c.json(
          {
            error: 'Internal Server Error, please try again later.',
          },
          500,
        )
      }
    }
    return c.json(cached)
  })
  .post(
    '/',
    zValidator(
      'query',
      z.object({
        token: z.string(),
      }),
    ),
    zValidator('json', TrpFrogImageGenerationResultSchema),
    async c => {
      const { token } = c.req.valid('query')
      if (token !== env.TRPFROG_ADMIN_KEY) {
        return c.json(
          {
            success: false,
            error: 'Unauthorized',
          },
          401,
        )
      }

      const newRecord = c.req.valid('json')
      try {
        cache.set(TRPFROG_DIFFUSION_KV_KEY, newRecord)
        await kv.set(TRPFROG_DIFFUSION_KV_KEY, newRecord)
      } catch (e) {
        console.error(e)
        return c.json(
          {
            success: false,
            error: 'Internal Server Error, please try again later.',
          },
          500,
        )
      }

      return c.json({
        success: true,
      })
    },
  )
