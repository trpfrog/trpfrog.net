import { Hono } from 'hono'

import { createNextMiddleware } from '@/lib/hono-middleware.ts'

const app = new Hono()

app.get('/tweets/*', c => {
  return c.text('Under construction...')
})

export const { middleware, config } = createNextMiddleware(app)
