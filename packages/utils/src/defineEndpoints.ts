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
    [K in keyof T]: {
      port: T[K]['port'] extends number ? T[K]['port'] : undefined
      development: T[K]['development'] extends string
        ? T[K]['development']
        : T[K]['port'] extends number
          ? `http://localhost:${T[K]['port']}`
          : T[K]['production']
      production: T[K]['production']
      endpoint: (env: 'development' | 'production' | 'test') => string | null
    }
  }
}
