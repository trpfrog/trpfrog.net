import { services } from '@trpfrog.net/constants'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { route as editRoute } from './routes/edit'
import { route as createTweetBlockRoute } from './routes/create-tweet-block'
import { route as generateAltTextRoute } from './routes/generate-alt-text'
import { route as uploadImageRoute } from './routes/upload-image'
import { route as watchPostRoute } from './routes/watch-post'

export const app = new Hono()
  .use(logger())
  .use(prettyJSON())
  .use(cors({ origin: services.website.development }))
  .get('/health', c => c.text('OK'))
  .route('/edit', editRoute)
  .route('/create_tweet_block', createTweetBlockRoute)
  .route('/upload_image', uploadImageRoute)
  .route('/generate_alt_text', generateAltTextRoute)

// Hono RPC に含めないように method chain から外す
app.route('/watch-post', watchPostRoute)

// eslint-disable-next-line no-restricted-exports
export default {
  port: services.mdServer.port,
  fetch: app.fetch,
  idleTimeout: 60,
}
