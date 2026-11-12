import type { McpToolDescription } from './protocol'

type WebMcpTool = Omit<McpToolDescription, 'annotations'> & {
  annotations?: McpToolDescription['annotations']
  execute: (args?: Record<string, unknown>) => Promise<unknown>
}

type ModelContext = {
  registerTool?: (tool: WebMcpTool) => unknown
  provideContext?: (context: { tools: WebMcpTool[] }) => unknown
}

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/) に対応したブラウザで、MCP サーバーと同じツールを登録する。
 * ツールの実行は MCP サーバーに tools/call を送るだけなので、処理はサーバー側の実装 1 つで済む。
 *
 * WebMcpScript がこの関数を文字列化して <head> に埋め込むため、外側の変数や import を参照してはいけない。
 */
export function registerWebMcpTools(tools: McpToolDescription[], endpoint: string) {
  const modelContext =
    (navigator as Navigator & { modelContext?: ModelContext }).modelContext ??
    (document as Document & { modelContext?: ModelContext }).modelContext
  if (!modelContext) return

  const callMcpTool = async (name: string, args: Record<string, unknown> = {}) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name, arguments: args },
      }),
    })
    const message = (await res.json()) as { result?: unknown; error?: { message: string } }
    return (
      message.result ?? {
        content: [{ type: 'text', text: message.error?.message ?? `HTTP ${res.status}` }],
        isError: true,
      }
    )
  }

  const webMcpTools: WebMcpTool[] = [
    ...tools.map(tool => ({
      ...tool,
      execute: (args?: Record<string, unknown>) => callMcpTool(tool.name, args),
    })),
    // ブラウザ上でだけ意味を持つツール
    {
      name: 'open_page',
      title: 'ページを開く',
      description:
        'つまみネット内のページを開く。path は /blog や /blog/<slug> のようなサイト内のパス。',
      inputSchema: {
        type: 'object',
        properties: { path: { type: 'string', description: '/ から始まるサイト内のパス' } },
        required: ['path'],
      },
      execute: async args => {
        const path = args?.path
        if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
          return {
            content: [{ type: 'text', text: 'path must be a site-relative path starting with /' }],
            isError: true,
          }
        }
        location.assign(path)
        return { content: [{ type: 'text', text: `Opened ${path}` }] }
      },
    },
  ]

  // 策定中の API なので、登録に失敗してもページの表示は続ける
  try {
    if (modelContext.registerTool) {
      for (const tool of webMcpTools) {
        Promise.resolve(modelContext.registerTool(tool)).catch(() => {})
      }
    } else {
      modelContext.provideContext?.({ tools: webMcpTools })
    }
  } catch {}
}
