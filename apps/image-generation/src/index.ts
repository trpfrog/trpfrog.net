import { differenceInMinutes } from 'date-fns'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { cache } from 'hono/cache'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
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

const app = new Hono<{ Bindings: Bindings }>()
  .use(trimTrailingSlash())
  .use(cors())
  .get('/current', cache({ cacheName: 'current-image', cacheControl: 'max-age-3600' }), async c => {
    const arrayBuffer = await c.env.DIFFUSION_KV.get('current-image', {
      type: 'arrayBuffer',
    })
    return c.newResponse(arrayBuffer)
  })
  .get(
    '/current/metadata',
    cache({ cacheName: 'current-metadata', cacheControl: 'max-age-3600' }),
    async c => {
      const data = await c.env.DIFFUSION_KV.get('current-metadata', { type: 'json' })
      return c.json(MetadataSchema.parse(data))
    },
  )
  .post('/update', requiresApiKey(), async c => {
    const { OPENAI_API_KEY, HUGGINGFACE_TOKEN } = env(c)

    if (c.req.query('force') !== 'true') {
      const metadata = await c.env.DIFFUSION_KV.get('current-metadata', { type: 'json' }).then(
        (data: unknown) => MetadataSchema.parse(data),
      )
      const diffMinutes = differenceInMinutes(new Date(), metadata.generatedTime)
      const minUpdateMinutes = 180

      if (diffMinutes <= minUpdateMinutes) {
        return c.json({
          status: 'skipped',
          message: `Minimum update interval is ${minUpdateMinutes} minutes, please wait for ${minUpdateMinutes - diffMinutes} minutes.`,
        })
      }
    }

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

    await Promise.all([
      c.env.DIFFUSION_KV.put('current-image', data.arrayBuffer),
      c.env.DIFFUSION_KV.put('current-metadata', JSON.stringify(data)),
    ])

    return c.json({
      status: 'updated',
    })
  })

export type AppType = typeof app

// eslint-disable-next-line no-restricted-exports
export default app
