import { z } from 'zod'

const EndpointRecordSchema = z.record(
  z.string(),
  z.object({
    port: z.number().nullish(),
    development: z
      .string()
      .url()
      .refine(value => new URL(value).origin === value, {
        message: '`development` must be a valid origin URL or null',
      })
      .nullish(),
    production: z
      .string()
      .url()
      .refine(value => new URL(value).origin === value, {
        message: '`production` must be a valid origin URL or null',
      })
      .nullish(),
    basePath: z
      .string()
      .refine(value => value.startsWith('/'))
      .nullish(),
  }),
)

export type EndpointRecord = z.infer<typeof EndpointRecordSchema>

type ReturnRecord<
  Port extends number | null | undefined,
  Development extends string | null | undefined,
  Production extends string | null | undefined,
  BasePath extends string | null | undefined,
  DevelopmentFinally = Development extends string
    ? Development
    : Port extends number
      ? `http://localhost:${Port}`
      : Production,
> = {
  port: Port
  development: DevelopmentFinally
  production: Production
  basePath: BasePath
  origin: (env: 'development' | 'production' | 'test') => DevelopmentFinally | Production
}

export function defineEndpoints<const T extends EndpointRecord>(endpoints: T) {
  const parsedEndpoints = EndpointRecordSchema.parse(endpoints)

  for (const name in parsedEndpoints) {
    const currentEndpoint = parsedEndpoints[name]
    parsedEndpoints[name].development ??= currentEndpoint.port
      ? `http://localhost:${currentEndpoint.port}`
      : currentEndpoint.production

    // @ts-expect-error - origin is not typed
    parsedEndpoints[name].origin = (env: 'development' | 'production' | 'test') => {
      return env === 'production'
        ? parsedEndpoints[name].production
        : parsedEndpoints[name].development
    }

    if (currentEndpoint.production && /^https?:\/\/[^/]+/.test(currentEndpoint.production)) {
      parsedEndpoints[name].basePath = currentEndpoint.production.replace(/^https?:\/\/[^/]+/, '')
    }
  }

  return parsedEndpoints as {
    [K in keyof T]: ReturnRecord<
      T[K]['port'],
      T[K]['development'],
      T[K]['production'],
      T[K]['basePath']
    >
  }
}
