import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'

import { Env } from '../env'
import { UseCases } from '../wire'

import { queryApp } from './query'
import { resourceApp } from './resource'
import { updateApp } from './update'

export function createApp(ucs: UseCases) {
  return new Hono<Env>()
    .basePath(services.imageGeneration.basePath)
    .use(contextStorage())
    .use(prettyJSON())
    .use(trimTrailingSlash())
    .use(cors())
    .use(async (c, next) => {
      c.set('UCS', ucs)
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
    .get('/status', async c => {
      const status = await c.var.UCS.shouldUpdate()
      return c.json(status)
    })
    .route('/update', updateApp)
    .route('/query', queryApp)
    .route('/resource', resourceApp)
}

export type AppType = ReturnType<typeof createApp>
