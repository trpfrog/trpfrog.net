import { services } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import type app from './index'

type AppType = typeof app

export function createContentServerClient(env: 'development' | 'production' | 'test') {
  const origin = services.contentServer.origin(env)
  if (origin == null) {
    throw new Error('Content server is not available in this environment')
  }
  return hc<AppType>(origin)
}
