import { validate, InferSchemaOutput } from '@trpfrog.net/utils'
import * as v from 'valibot'

const EndpointRecordSchema = v.record(
  v.string(),
  v.object({
    port: v.nullish(v.number()),
    development: v.nullish(
      v.pipe(
        v.string(),
        v.url(),
        v.check(
          value => new URL(value).origin === value,
          '`development` must be a valid origin URL or null',
        ),
      ),
    ),
    production: v.nullish(
      v.pipe(
        v.string(),
        v.url(),
        v.check(
          value => new URL(value).origin === value,
          '`production` must be a valid origin URL or null',
        ),
      ),
    ),
    basePath: v.nullish(
      v.pipe(
        v.string(),
        v.check(value => value.startsWith('/')),
      ),
    ),
  }),
)

export type EndpointRecord = InferSchemaOutput<typeof EndpointRecordSchema>

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
  const parsedEndpoints = validate(EndpointRecordSchema, endpoints)

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
