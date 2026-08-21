import { env } from 'hono/adapter'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

export function requiresApiKey() {
  return createMiddleware<
    // oxlint-disable-next-line typescript/no-explicit-any -- Hono middleware generic uses any here.
    any,
    // oxlint-disable-next-line typescript/no-explicit-any -- Hono middleware generic uses any here.
    any,
    {
      in: {
        header: {
          'x-api-key': string
        }
      }
      out: Record<string, never>
    }
  >(async (c, next) => {
    const requestedApiKey = c.req.header('x-api-key')
    const { TRPFROG_FUNCTIONS_SECRET } = env(c)

    if (TRPFROG_FUNCTIONS_SECRET && TRPFROG_FUNCTIONS_SECRET !== requestedApiKey) {
      throw new HTTPException(401)
    }
    await next()
  })
}
