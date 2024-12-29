import { Hono } from 'hono'

import { alphaApp } from './alpha-router'

const app = new Hono().route('/alpha', alphaApp)

// eslint-disable-next-line no-restricted-exports
export default app
