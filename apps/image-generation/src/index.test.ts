import { describe, expect, it, vi } from 'vitest'

import type { Bindings } from '../worker-configuration'

type MockedAppRequest = (
  input: Request | string | URL,
  requestInit?: RequestInit,
  env?: Bindings,
  executionCtx?: ExecutionContext,
) => Response | Promise<Response>

async function loadWorkerWithMockedController(mockedRequest: MockedAppRequest) {
  vi.resetModules()
  const appRequest = vi.fn(
    (
      input: Request | string | URL,
      requestInit?: RequestInit,
      env?: Bindings,
      executionCtx?: ExecutionContext,
    ) => mockedRequest(input, requestInit, env, executionCtx),
  )
  vi.doMock('./controller', () => ({
    createApp: () => ({ fetch: vi.fn(), request: appRequest }),
  }))
  const mod = await import('./index')
  return { worker: mod.default, appRequest }
}

const createTestEnv = (): Bindings =>
  ({
    TRPFROG_FUNCTIONS_SECRET: 'secret-key',
  }) as Bindings

const createExecutionCtx = (): ExecutionContext => ({
  waitUntil: vi.fn(),
  passThroughOnException: vi.fn(),
  props: {},
})

describe('scheduled', () => {
  it('sends an authenticated POST request to /icongen/update', async () => {
    const { worker, appRequest } = await loadWorkerWithMockedController(
      async () =>
        new Response(JSON.stringify({ status: 'accepted' }), {
          status: 202,
          headers: { 'content-type': 'application/json' },
        }),
    )
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const env = createTestEnv()
    const executionCtx = createExecutionCtx()

    await worker.scheduled({} as ScheduledController, env, executionCtx)

    expect(appRequest).toHaveBeenCalledTimes(1)
    const [input, requestInit, calledEnv, calledExecutionCtx] = appRequest.mock.calls[0]
    expect(input).toBe('/icongen/update')
    expect(requestInit?.method).toBe('POST')
    expect(new Headers(requestInit?.headers).get('x-api-key')).toBe('secret-key')
    expect(calledEnv).toBe(env)
    expect(calledExecutionCtx).toBe(executionCtx)
    expect(logSpy).toHaveBeenCalledWith('Scheduled update request finished:', {
      status: 'accepted',
    })
  })

  it('logs error when update endpoint response is not ok', async () => {
    const { worker } = await loadWorkerWithMockedController(
      async () => new Response('unauthorized', { status: 401, statusText: 'Unauthorized' }),
    )
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const env = createTestEnv()
    const executionCtx = createExecutionCtx()

    await worker.scheduled({} as ScheduledController, env, executionCtx)

    expect(spy).toHaveBeenCalledWith('Scheduled update failed: 401 Unauthorized', 'unauthorized')
  })
})
