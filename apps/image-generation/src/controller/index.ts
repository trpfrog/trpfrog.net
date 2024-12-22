import { zValidator } from '@hono/zod-validator'
import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { z } from 'zod'

import { imageMetadataRepoQuerySchema } from '../domain/repos/image-metadata-repo'
import { Env } from '../env'
import { UseCases } from '../wire'

import { requiresApiKey } from './middlewares'

export function createApp(ucs: UseCases) {
  return new Hono<Env>()
    .basePath(services.imageGeneration.basePath)
    .use(contextStorage())
    .use(prettyJSON())
    .use(trimTrailingSlash())
    .use(cors())
    .get('/current', async c => {
      const arrayBuffer = await ucs.currentImage()
      return c.newResponse(arrayBuffer)
    })
    .get('/current/metadata', async c => {
      const data = await ucs.currentMetadata()
      if (data == null) {
        return c.json({ error: 'No metadata found' }, 404)
      }
      return c.json(data)
    })
    .post('/update', requiresApiKey(), async c => {
      const result = await ucs.refreshImageIfStale({
        forceUpdate: c.req.query('force') === 'true',
      })

      return result.updated
        ? c.json(
            {
              status: 'updated',
            },
            201, // 201 Created
          )
        : c.json({
            status: 'skipped',
            message: result.message,
          })
    })
    .get(
      '/query',
      requiresApiKey(),
      zValidator(
        'query',
        z
          .object({
            q: z.string().optional(),
            limit: z.coerce.number().int().positive().max(100).optional(),
            offset: z.coerce.number().optional(),
          })
          .strict(),
      ),
      async c => {
        const rawQuery = c.req.valid('query')

        const res = imageMetadataRepoQuerySchema.safeParse({
          where: {
            prompt: rawQuery.q,
          },
          limit: rawQuery.limit,
          offset: rawQuery.offset,
        } satisfies z.input<typeof imageMetadataRepoQuerySchema>)

        if (!res.success) {
          return c.json({ error: res.error }, 400)
        }
        const data = await ucs.queryImageMetadata(res.data)
        return c.json({
          result: data.result,
          total: data.count,
        })
      },
    )
}

export type AppType = ReturnType<typeof createApp>
