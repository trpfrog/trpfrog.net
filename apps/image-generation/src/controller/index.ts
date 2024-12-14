import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'

import { Bindings } from '../../worker-configuration'
import { Env } from '../env'
import { UseCases } from '../wire'

export function createApp(initUseCases: (b: Bindings) => UseCases) {
  return new Hono<Env>()
    .basePath(services.imageGeneration.basePath)
    .use(contextStorage())
    .use(prettyJSON())
    .use(trimTrailingSlash())
    .use(cors())
    .use(async (c, next) => {
      c.set('UCS', initUseCases(c.env))
      await next()
    })
    .get('/current', async c => {
      const arrayBuffer = await c.var.UCS.currentImage()
      return c.newResponse(arrayBuffer)
    })
    .get('/current/metadata', async c => {
      const data = await c.var.UCS.currentMetadata()
      if (data == null) {
        return c.json({ error: 'No metadata found' }, 404)
      }
      return c.json(data)
    })
    .post('/update', async c => {
      const result = await c.var.UCS.refreshImageIfStale({
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
}

export type AppType = ReturnType<typeof createApp>
