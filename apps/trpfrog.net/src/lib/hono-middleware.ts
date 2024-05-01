import { type Context, Hono } from 'hono'
import { inspectRoutes } from 'hono/dev'

import type { NextFetchEvent } from 'next/server'

const passThroughHeaderName = 'x-next-hono-all-middleware-passed'

export function passThrough(c: Context) {
  c.res.headers.set(passThroughHeaderName, 'yes')
  return c.text('ok')
}

export function createNextMiddleware(app: Hono) {
  const middlewareApp = new Hono()
  middlewareApp.route('/', app)
  middlewareApp.all('*', passThrough)

  return {
    middleware: async (req: Request, event: NextFetchEvent): Promise<Response | void> => {
      const res = await middlewareApp.fetch(req, {}, event)

      const isAllMiddlewarePassed = res.headers.get(passThroughHeaderName) === 'yes'
      if (res.headers.has(passThroughHeaderName)) {
        res.headers.delete(passThroughHeaderName)
      }

      return isAllMiddlewarePassed ? undefined : res
    },
    config: {
      matcher: inspectRoutes(app).map(route => route.path),
    },
  }
}
