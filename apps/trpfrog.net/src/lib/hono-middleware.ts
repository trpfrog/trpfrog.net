import { Hono } from 'hono'
import { inspectRoutes } from 'hono/dev'
import { handle } from 'hono/vercel'
import { NextResponse } from 'next/server'

export function createNextMiddleware(app: Hono) {
  const middlewareApp = new Hono()
  middlewareApp.route('/', app)
  middlewareApp.all('*', () => NextResponse.next())

  return {
    middleware: handle(middlewareApp),
    matcher: inspectRoutes(app).map(route => route.path),
  }
}
