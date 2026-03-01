import { NextResponse } from 'next/server'

import { Hono } from 'hono'
import { inspectRoutes } from 'hono/dev'
import { handle } from 'hono/vercel'

export function createNextProxy(app: Hono) {
  const proxyApp = new Hono()
  proxyApp.route('/', app)
  proxyApp.all('*', () => NextResponse.next())

  return {
    proxy: handle(proxyApp),
    matcher: inspectRoutes(app).map(route => route.path),
  }
}
