import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import { app as blogRouter } from './_routes/blog'
import { app as diffusionRouter } from './_routes/trpfrog-diffusion'

export const runtime = 'nodejs'

const app = new Hono()
  .basePath('/api')
  .route('/blog', blogRouter)
  .route('/trpfrog-diffusion', diffusionRouter)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
