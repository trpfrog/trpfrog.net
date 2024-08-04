import { Hono } from 'hono'

import { createNextMiddleware } from '@/lib/hono-middleware.ts'

export const runtime = 'nodejs'

const app = new Hono()

// keep kawaii query parameter
app.use(async (c, next) => {
  try {
    const referer = c.req.header('referer')
    const refererUrl = referer ? new URL(referer) : null
    const nextUrl = new URL(c.req.url)
    if (
      referer &&
      refererUrl?.searchParams.get('kawaii') === 'true' &&
      !nextUrl.searchParams.has('kawaii')
    ) {
      nextUrl.searchParams.set('kawaii', 'true')
      return c.redirect(nextUrl.toString())
    }
  } catch {
    // ignore
  }
  await next()
})

app.get('/tweets/*', c => {
  return c.text('Under construction...')
})

export const { middleware, config } = createNextMiddleware(app)
