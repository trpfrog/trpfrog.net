import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { handle } from 'hono/vercel'

import { openApiDocument } from '@/lib/agent-api/openapi'

import { app as blogRouter } from './_routes/blog'
import { app as budouxRouter } from './_routes/budoux'
import { app as revalidateRouter } from './_routes/revalidate'

const app = new Hono()
  .use(trimTrailingSlash())
  .basePath('/api')
  .get('/health', c => c.json({ status: 'ok' }))
  .get('/openapi.json', c => c.json(openApiDocument))
  .route('/blog', blogRouter)
  .route('/budoux', budouxRouter)
  .route('/revalidate', revalidateRouter)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
