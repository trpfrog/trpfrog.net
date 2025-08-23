import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { createMiddleware } from 'hono/factory'

import type { Except } from 'type-fest'

type CORSOptions = NonNullable<Parameters<typeof cors>[0]>

export const corsWithNodeEnv = (
  options?: Except<CORSOptions, 'origin'> & {
    origin: (nodeEnv: 'development' | 'production' | 'test') => string | string[]
  },
) => {
  const { origin, ...rest } = options ?? {}
  return createMiddleware(async (c, next) => {
    const nodeEnv = env(c).NODE_ENV ?? 'production'
    const handler = cors({
      ...rest,
      origin: origin?.(nodeEnv) ?? '*',
    })
    await handler(c, next)
  })
}
