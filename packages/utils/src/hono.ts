import { cors } from 'hono/cors'
import { createMiddleware } from 'hono/factory'

import type { Except } from 'type-fest'

type CORSOptions = NonNullable<Parameters<typeof cors>[0]>

export const corsWithNodeEnv = (
  options?: Except<CORSOptions, 'origin'> & {
    originFn: (nodeEnv: 'development' | 'production' | 'test') => string | string[]
  },
) => {
  const { originFn, ...rest } = options ?? {}
  return createMiddleware(async (c, next) => {
    const nodeEnv = process.env.NODE_ENV ?? 'development'
    const handler = cors({
      ...rest,
      // @ts-expect-error -- nodeEnv is generally 'development' | 'production' | 'test', TODO: validate
      origin: originFn?.(nodeEnv) ?? '*',
    })
    await handler(c, next)
  })
}
