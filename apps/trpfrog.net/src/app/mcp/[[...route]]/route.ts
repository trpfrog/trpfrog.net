import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'

import { problem } from '@/lib/agent-api/problem'
import { handleMcpMessage } from '@/lib/mcp/protocol'
import { MCP_SERVER_CARD, MCP_SERVER_INFO, MCP_TOOLS } from '@/lib/mcp/server'

const app = new Hono()
  .basePath('/mcp')
  .use(cors({ origin: '*', exposeHeaders: ['Mcp-Session-Id'] }))
  .get('/server-card', c =>
    c.json(MCP_SERVER_CARD, 200, { 'Content-Type': 'application/mcp-server-card+json' }),
  )
  // セッションを持たないので、サーバーから送る SSE ストリームは提供しない
  .get('/', c => c.text('Method Not Allowed', 405, { Allow: 'POST' }))
  .delete('/', c => c.text('Method Not Allowed', 405, { Allow: 'POST' }))
  .post('/', async c => {
    let body: unknown
    try {
      body = await c.req.json()
    } catch {
      return c.json(
        { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } },
        400,
      )
    }
    const response = await handleMcpMessage(body, MCP_SERVER_INFO, MCP_TOOLS)
    return response ? c.json(response) : c.body(null, 202)
  })

app.notFound(c =>
  problem(c, 404, {
    code: 'route_not_found',
    title: 'Route not found',
    detail: `${c.req.method} ${c.req.path} does not exist.`,
  }),
)

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)
