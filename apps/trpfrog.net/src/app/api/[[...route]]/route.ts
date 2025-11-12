import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { handle } from 'hono/vercel'

import { app as budouxRouter } from './_routes/budoux'
import { app as revalidateRouter } from './_routes/revalidate'
import { app as tmpCacheRouter } from './_routes/tmpCache'

const app = new Hono()
  .use(trimTrailingSlash())
  .basePath('/api')
  .route('/budoux', budouxRouter)
  .route('/revalidate', revalidateRouter)
  // cache tag は fetch にしか付けられないため一時的にこれを使う
  // TODO: dynamicIO が stable or experimental になったら削除
  .route('/tmp_cache', tmpCacheRouter)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
