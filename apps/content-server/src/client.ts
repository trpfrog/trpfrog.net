import { services } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import type app from './index'

type AppType = typeof app

export function createContentServerClient(env: 'development' | 'production' | 'test') {
  const origin = services.contentServer.origin(env)
  return hc<AppType>(origin)
}
