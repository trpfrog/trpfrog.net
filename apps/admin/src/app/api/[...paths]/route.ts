import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api').get('/auth/logout', c => {
  return c.text('Logout', 401)
})

export type ApiAppType = typeof app

export const GET = handle(app)
