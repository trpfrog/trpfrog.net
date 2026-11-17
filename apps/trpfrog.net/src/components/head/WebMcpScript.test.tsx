import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, test, vi } from 'vite-plus/test'

import type { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

import { WebMcpScript } from './WebMcpScript'

vi.mock('@blog/rpc', () => ({
  fetchPostList: vi.fn<typeof fetchPostList>(),
  fetchPost: vi.fn<typeof fetchPost>(),
  fetchSlugs: vi.fn<typeof fetchSlugs>(),
}))

type RegisteredTool = {
  name: string
  execute: (args?: Record<string, unknown>) => Promise<unknown>
}

/** <head> に埋め込まれるのと同じ文字列を、このモジュールのスコープの外で実行する */
function runInlineScript() {
  const html = renderToStaticMarkup(<WebMcpScript />)
  const script = html.replace(/^<script>/, '').replace(/<\/script>$/, '')
  // oxlint-disable-next-line typescript/no-implied-eval -- 埋め込むスクリプトが外側の変数に依存しないことを確かめる
  new Function(script)()
}

function stubModelContext() {
  const registerTool = vi.fn<(tool: RegisteredTool) => void>()
  vi.stubGlobal('navigator', { modelContext: { registerTool } })
  return registerTool
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('WebMcpScript', () => {
  test('registers the MCP server tools and open_page', () => {
    const registerTool = stubModelContext()
    runInlineScript()
    expect(registerTool.mock.calls.map(([tool]) => tool.name)).toStrictEqual([
      'search_blog_posts',
      'get_blog_post',
      'list_blog_tags',
      'get_site_overview',
      'open_page',
    ])
  })

  test('executes tools through the MCP endpoint', async () => {
    const registerTool = stubModelContext()
    const result = { content: [{ type: 'text', text: '[]' }] }
    const fetchMock = vi.fn<typeof fetch>(async () =>
      Response.json({ jsonrpc: '2.0', id: 1, result }),
    )
    vi.stubGlobal('fetch', fetchMock)
    runInlineScript()

    const search = registerTool.mock.calls.find(([tool]) => tool.name === 'search_blog_posts')
    expect(await search?.[0].execute({ query: 'つまみ' })).toStrictEqual(result)

    const [url, init] = fetchMock.mock.calls[0] ?? []
    expect(url).toBe('/mcp')
    expect(JSON.parse(typeof init?.body === 'string' ? init.body : '')).toMatchObject({
      method: 'tools/call',
      params: { name: 'search_blog_posts', arguments: { query: 'つまみ' } },
    })
  })

  test('returns a tool error when the MCP server returns a JSON-RPC error', async () => {
    const registerTool = stubModelContext()
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(async () =>
        Response.json({ jsonrpc: '2.0', id: 1, error: { code: -32602, message: 'Unknown tool' } }),
      ),
    )
    runInlineScript()

    const tool = registerTool.mock.calls[0]?.[0]
    expect(await tool?.execute()).toMatchObject({ isError: true })
  })

  test('does nothing when the browser does not support WebMCP', () => {
    vi.stubGlobal('navigator', {})
    expect(() => runInlineScript()).not.toThrow()
  })
})
