import { Hono } from 'hono'

import { alphaApp } from './alpha-router'
import { Env } from './env'

const app = new Hono<Env>().route('/alpha', alphaApp)
// eslint-disable-next-line no-restricted-exports
export default app
