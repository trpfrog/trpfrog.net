import { z } from 'zod'

const EndpointRecordSchema = z.record(
  z.string(),
  z.object({
    port: z.number().nullish(),
    development: z.string().url().nullish(),
    production: z.string().url().nullish(),
  }),
)

export type EndpointRecord = z.infer<typeof EndpointRecordSchema>

type ReturnRecord<
  Port extends number | null | undefined,
  Development extends string | null | undefined,
  Production extends string | null | undefined,
  DevelopmentFinally = Development extends string
    ? Development
    : Port extends number
      ? `http://localhost:${Port}`
      : Production,
> = {
  port: Port
  development: DevelopmentFinally
  production: Production
  endpoint: (env: 'development' | 'production' | 'test') => DevelopmentFinally | Production
}

export function defineEndpoints<const T extends EndpointRecord>(endpoints: T) {
  const parsedEndpoints = EndpointRecordSchema.parse(endpoints)

  for (const name in parsedEndpoints) {
    const currentEndpoint = parsedEndpoints[name]
    parsedEndpoints[name].development ??= currentEndpoint.port
      ? `http://localhost:${currentEndpoint.port}`
      : currentEndpoint.production

    // @ts-expect-error - endpoint is not typed
    parsedEndpoints[name].endpoint = (env: 'development' | 'production' | 'test') => {
      return env === 'production'
        ? parsedEndpoints[name].production
        : parsedEndpoints[name].development
    }
  }

  return parsedEndpoints as {
    [K in keyof T]: ReturnRecord<T[K]['port'], T[K]['development'], T[K]['production']>
  }
}
