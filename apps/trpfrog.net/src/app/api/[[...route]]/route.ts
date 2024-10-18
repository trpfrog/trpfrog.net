import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { handle } from 'hono/vercel'

import { app as blogRouter } from './_routes/blog'
import { app as budouxRouter } from './_routes/budoux'
import { app as diffusionRouter } from './_routes/trpfrog-diffusion'

export const runtime = 'nodejs'

const app = new Hono()
  .use(trimTrailingSlash())
  .basePath('/api')
  .route('/blog', blogRouter)
  .route('/diffusion', diffusionRouter)
  .route('/budoux', budouxRouter)

export type AppType = typeof app

function patchedHandle(app: AppType) {
  const handler = handle(app)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: Request, context: any) => handler(req, context)
}

export const GET = patchedHandle(app)
export const POST = patchedHandle(app)
