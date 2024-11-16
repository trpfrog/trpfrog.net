import { services } from '@trpfrog.net/constants'
import { differenceInMinutes } from 'date-fns'
import { Context, Hono } from 'hono'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { z } from 'zod'

import { Bindings } from './bindings'
import { requiresApiKey } from './middlewares'
import { ApiKeySchema } from './trpfrog-diffusion'
import { generateNew } from './trpfrog-diffusion/generateNew'

const MetadataSchema = z.object({
  generatedTime: z.number().int().min(0),
  prompt: z.string(),
  translated: z.string(),
})

type Env = { Bindings: Bindings }

/**
 * Fetches the cache status of the current image and metadata.
 * @param c Context
 * @returns Cache status
 */
async function fetchCacheStatus(c: Context<Env>) {
  const metadata = await c.env.DIFFUSION_KV.get('current-metadata', { type: 'json' }).then(
    (data: unknown) => MetadataSchema.parse(data),
  )
  const minutesAfterLastUpdated = differenceInMinutes(new Date(), metadata.generatedTime)
  const minUpdateMinutes = 180
  return {
    shouldCache: minutesAfterLastUpdated <= minUpdateMinutes,
    waitMinutes: Math.max(0, minUpdateMinutes - minutesAfterLastUpdated),
  }
}

export const app = new Hono<Env>()
  .basePath(services.imageGeneration.basePath)
  .use(prettyJSON())
  .use(trimTrailingSlash())
  .use(cors())
  .get('/current', async c => {
    const arrayBuffer = await c.env.DIFFUSION_KV.get('current-image', {
      type: 'arrayBuffer',
    })
    return c.newResponse(arrayBuffer)
  })
  .get('/current/metadata', async c => {
    const data = await c.env.DIFFUSION_KV.get('current-metadata', { type: 'json' })
    return c.json(MetadataSchema.parse(data))
  })
  .post('/status', requiresApiKey(), async c => {
    const data = await fetchCacheStatus(c)
    return c.json(data)
  })
  .post('/update', async c => {
    const { OPENAI_API_KEY, HUGGINGFACE_TOKEN } = env(c)
    const { shouldCache, waitMinutes } = await fetchCacheStatus(c)
    const isForceUpdate = c.req.query('force') === 'true'

    // Check if the request is authorized
    if (isForceUpdate) {
      await requiresApiKey()(c, async () => {})
    }

    // Skip update if the last update was within 180 minutes
    if (!isForceUpdate && shouldCache) {
      return c.json({
        status: 'skipped',
        message: `Minimum update interval is 180 minutes, please wait ${waitMinutes} minutes.`,
      })
    }

    // Generate a new image and metadata
    const data = await generateNew({
      numberOfRetries: 3,
      ...ApiKeySchema.parse({
        openaiApiKey: OPENAI_API_KEY,
        hfToken: HUGGINGFACE_TOKEN,
      }),
    }).catch(e => {
      console.error(e)
      throw new HTTPException(500)
    })

    // Update the current image and metadata on KV store
    await Promise.all([
      c.env.DIFFUSION_KV.put('current-image', data.arrayBuffer),
      c.env.DIFFUSION_KV.put('current-metadata', JSON.stringify(data)),
    ])

    return c.json(
      {
        status: 'updated',
      },
      201, // 201 Created
    )
  })

export type AppType = typeof app
