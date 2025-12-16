import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { route as watchPostRoute } from './routes/watch-post'

const app = new Hono()
  .use(cors({ origin: services.website.development }))
  .route('/watch-post', watchPostRoute)

// eslint-disable-next-line no-restricted-exports
export default {
  port: services.mdServer.port,
  fetch: app.fetch,
}
