import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'

import { requiresApiKey } from './middlewares'

import { RequiredDependencies } from '@/domain/deps'
import { Env } from '@/env'
import { refreshImage, refreshImageIfStale } from '@/usecases/updateImage'

export function createApp(initDeps: (b: Bindings) => RequiredDependencies) {
  return new Hono<Env>()
    .basePath(services.imageGeneration.basePath)
    .use(contextStorage())
    .use(prettyJSON())
    .use(trimTrailingSlash())
    .use(cors())
    .use(async (c, next) => {
      c.set('DEPS', initDeps(c.env))
      await next()
    })
    .get('/current', async c => {
      const arrayBuffer = await c.var.DEPS.imageRepo.read.currentImage()
      return c.newResponse(arrayBuffer)
    })
    .get('/current/metadata', async c => {
      const data = await c.var.DEPS.imageRepo.read.currentMetadata()
      return c.json(data)
    })
    .post('/update', async c => {
      const isForceUpdate = c.req.query('force') === 'true'

      let result: Awaited<ReturnType<typeof refreshImageIfStale>>
      if (isForceUpdate) {
        // Force update requires API key
        await requiresApiKey()(c, async () => {})
        await refreshImage(c.var.DEPS)
        result = { updated: true }
      } else {
        result = await refreshImageIfStale(c.var.DEPS)
      }

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
}

export type AppType = ReturnType<typeof createApp>
