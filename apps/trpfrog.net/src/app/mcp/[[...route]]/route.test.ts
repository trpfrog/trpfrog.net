// @vitest-environment node
import { NextRequest } from 'next/server'

import { describe, expect, it, vi } from 'vite-plus/test'

import type { getPost, listTags } from '@/lib/agent-api/blog'
import { searchPosts } from '@/lib/agent-api/blog'

import { GET, POST } from './route'

vi.mock('@/lib/agent-api/blog', () => ({
  getPost: vi.fn<typeof getPost>(),
  listTags: vi.fn<typeof listTags>(),
  searchPosts: vi.fn<typeof searchPosts>(async () => []),
}))

const post = (body: string) =>
  POST(
    new NextRequest('https://trpfrog.net/mcp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json, text/event-stream',
      },
      body,
    }),
  )

describe('MCP endpoint', () => {
  it('answers a JSON-RPC request with JSON', async () => {
    const res = await post(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }))
    expect(res.headers.get('content-type')).toContain('application/json')
    expect(await res.json()).toMatchObject({
      result: {
        tools: [
          { name: 'search_blog_posts' },
          { name: 'get_blog_post' },
          { name: 'list_blog_tags' },
          { name: 'get_site_overview' },
        ],
      },
    })
  })

  it('calls a tool with validated arguments', async () => {
    await post(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: 'search_blog_posts', arguments: { query: '徒歩' } },
      }),
    )
    expect(searchPosts).toHaveBeenCalledWith({ query: '徒歩', tag: undefined, limit: 20 })
  })

  it('accepts notifications with 202', async () => {
    const res = await post(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }))
    expect(res.status).toBe(202)
  })

  it('rejects broken JSON with a parse error', async () => {
    const res = await post('{')
    expect(res.status).toBe(400)
    expect(await res.json()).toMatchObject({ error: { code: -32700 } })
  })

  it('does not offer a server-sent event stream', async () => {
    expect((await GET(new NextRequest('https://trpfrog.net/mcp'))).status).toBe(405)
  })
})
