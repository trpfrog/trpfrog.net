import * as v from 'valibot'
import { describe, expect, it } from 'vite-plus/test'

import { defineTool, handleMcpMessage } from './protocol'

const info = { name: 'test/server', title: 'Test', version: '1.0.0', instructions: 'hi' }
const tools = [
  defineTool({
    name: 'echo',
    title: 'Echo',
    description: 'echo back',
    inputSchema: v.object({ text: v.string() }),
    handler: async ({ text }) => ({ text }),
  }),
]

const call = (method: string, params?: Record<string, unknown>) =>
  handleMcpMessage({ jsonrpc: '2.0', id: 1, method, params }, info, tools)

describe('handleMcpMessage', () => {
  it('negotiates a supported protocol version on initialize', async () => {
    expect(await call('initialize', { protocolVersion: '2025-03-26' })).toMatchObject({
      result: { protocolVersion: '2025-03-26', serverInfo: { name: 'test/server' } },
    })
    expect(await call('initialize', { protocolVersion: '1999-01-01' })).toMatchObject({
      result: { protocolVersion: '2025-06-18' },
    })
  })

  it('returns null for notifications', async () => {
    expect(
      await handleMcpMessage({ jsonrpc: '2.0', method: 'notifications/initialized' }, info, tools),
    ).toBeNull()
  })

  it('lists tools with JSON Schema inputs', async () => {
    expect(await call('tools/list')).toMatchObject({
      result: {
        tools: [
          {
            name: 'echo',
            inputSchema: { type: 'object', properties: { text: { type: 'string' } } },
          },
        ],
      },
    })
  })

  it('calls a tool', async () => {
    expect(await call('tools/call', { name: 'echo', arguments: { text: 'kero' } })).toMatchObject({
      result: { structuredContent: { text: 'kero' }, content: [{ type: 'text' }] },
    })
  })

  it('reports invalid arguments as a tool error', async () => {
    expect(await call('tools/call', { name: 'echo', arguments: {} })).toMatchObject({
      result: { isError: true },
    })
  })

  it('rejects unknown tools and methods', async () => {
    expect(await call('tools/call', { name: 'nope' })).toMatchObject({ error: { code: -32602 } })
    expect(await call('resources/list')).toMatchObject({ error: { code: -32601 } })
  })

  it('rejects malformed messages', async () => {
    expect(await handleMcpMessage({ foo: 1 }, info, tools)).toMatchObject({
      error: { code: -32600 },
    })
  })
})
