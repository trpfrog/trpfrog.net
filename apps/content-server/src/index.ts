import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

import { alphaApp } from './alpha-router'
import { Env } from './env'

const app = new Hono<Env>()
  .use(cors())
  .use(prettyJSON())
  .use(contextStorage())
  .route('/alpha', alphaApp)

// eslint-disable-next-line no-restricted-exports
export default app
