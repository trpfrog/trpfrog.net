import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { handle } from 'hono/vercel'

import { app as budouxRouter } from './_routes/budoux'
import { app as revalidateRouter } from './_routes/revalidate'

const app = new Hono()
  .use(trimTrailingSlash())
  .basePath('/api')
  .route('/budoux', budouxRouter)
  .route('/revalidate', revalidateRouter)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
