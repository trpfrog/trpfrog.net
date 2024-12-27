import { getRuntimeKey } from 'hono/adapter'
import { getContext } from 'hono/context-storage'

import { Env } from '../env'

export function waitUntilIfSupported(p: Promise<unknown>): void {
  const c = getContext<Env>()

  // https://github.com/honojs/hono/issues/2649
  if (getRuntimeKey() === 'workerd') {
    c.executionCtx.waitUntil(p)
  } else {
    p.catch(() => {
      console.error('waitUntilIfSupported failed')
    })
  }
}
