import { z } from 'zod'

const EndpointRecordSchema = z.object({
  name: z.string(),
  port: z.number().nullable(),
  development: z.string().url().nullable(),
  production: z.string().url().nullable(),
})

type EndpointRecord = z.infer<typeof EndpointRecordSchema>

function createEndpointRecord<const T extends Omit<EndpointRecord, 'development'>>(record: T) {
  const ret = {
    ...record,
    development: record.port ? `http://localhost:${record.port}` : null,
  } as const
  return EndpointRecordSchema.parse(ret) as typeof ret
}

// ============================== ENDPOINTS ============================== //

const internalEndpoints = [
  createEndpointRecord({
    name: 'website',
    port: 3000,
    production: 'https://trpfrog.net',
  }),
  createEndpointRecord({
    name: 'backend',
    port: 8001,
    production: null,
  }),
  createEndpointRecord({
    name: 'mdServer',
    port: 8002,
    production: null,
  }),
] as const satisfies EndpointRecord[]

// ======================================================================= //

/**
 * The endpoints of the application.
 */
export const endpoints = Object.fromEntries(
  internalEndpoints.map(endpoint => [
    endpoint.name,
    // eslint-disable-next-line n/no-process-env
    process?.env.NODE_ENV === 'development' && endpoint.development
      ? endpoint.development
      : endpoint.production,
  ]),
)

/**
 * The ports of the backend services.
 */
export const ports = Object.fromEntries(
  internalEndpoints
    .filter(endpoint => typeof endpoint.port === 'number')
    .map(endpoint => [endpoint.name, endpoint.port!]),
)
