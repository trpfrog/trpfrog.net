import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { handle } from 'hono/vercel'

import { problem } from '@/lib/agent-api/problem'

import { app as budouxRouter } from './_routes/budoux'
import { app as revalidateRouter } from './_routes/revalidate'
import { app as v1Router } from './_routes/v1'

const app = new Hono()
  .use(trimTrailingSlash())
  .basePath('/api')
  .route('/v1', v1Router)
  .route('/budoux', budouxRouter)
  .route('/revalidate', revalidateRouter)

// エージェントが HTML のエラーページを読まずに済むよう、エラーは JSON で返す
app.notFound(c =>
  problem(c, 404, {
    code: 'route_not_found',
    title: 'Route not found',
    detail: `${c.req.method} ${c.req.path} does not exist.`,
    resolution: 'See https://trpfrog.net/api/v1/openapi.json for the available endpoints.',
  }),
)
app.onError((err, c) => {
  if (err instanceof HTTPException && err.status < 500) {
    return problem(c, err.status, {
      code: 'bad_request',
      title: 'Bad request',
      detail: err.message,
    })
  }
  console.error(err)
  return problem(c, 500, {
    code: 'internal_error',
    title: 'Internal server error',
    detail: 'An unexpected error occurred.',
    resolution: 'Retry later.',
  })
})

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
