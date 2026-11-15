import * as v from 'valibot'

import { typedObjectEntries } from './object'
import { validate } from './validator'

/**
 * 開発時に、サービス名から origin を決める。決められなければ null を返す。
 * dev サーバの立て方 (portless など) ごとに実装を差し替える。
 */
export type DevOriginResolver = (name: string, allNames: readonly string[]) => string | null

export interface ServiceDefinition {
  /** 開発時の origin を決めるための名前 */
  name: string
  production: string | null
  basePath?: string
}

export type Service<T extends ServiceDefinition> = T & {
  /** 開発時の origin。DevOriginResolver が決められなければ null */
  development: string | null
  origin: (env: 'development' | 'production' | 'test') => string | null
}

const OriginSchema = v.pipe(
  v.string(),
  v.url(),
  v.check(value => new URL(value).origin === value, 'must be an origin URL'),
)

const ServiceDefinitionSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  production: v.nullable(OriginSchema),
  basePath: v.optional(v.pipe(v.string(), v.startsWith('/'))),
})

export function defineServices<const T extends Record<string, ServiceDefinition>>(
  definitions: T,
  options: { resolveDevOrigin?: DevOriginResolver } = {},
): { [K in keyof T]: Service<T[K]> } {
  const entries = typedObjectEntries(definitions)
  const allNames = entries.map(([, definition]) => definition.name)

  const services = entries.map(([key, definition]) => {
    validate(ServiceDefinitionSchema, definition)
    const development = options.resolveDevOrigin?.(definition.name, allNames) ?? null
    const service: Service<ServiceDefinition> = {
      ...definition,
      development,
      origin: env => (env === 'production' ? definition.production : development),
    }
    return [key, service] as const
  })

  return Object.fromEntries(services) as { [K in keyof T]: Service<T[K]> }
}
