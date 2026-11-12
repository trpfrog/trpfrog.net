import { toJsonSchema } from '@valibot/to-json-schema'
import * as v from 'valibot'

import { type InferSchemaOutput, safeValidateUnknown } from '@trpfrog.net/utils'

/** MCP の tools/call で呼ばれる、読み取り専用のツール */
export type McpTool<TSchema extends v.GenericSchema = v.GenericSchema> = {
  name: string
  title: string
  description: string
  inputSchema: TSchema
  handler: (input: InferSchemaOutput<TSchema>) => Promise<unknown>
}

export function defineTool<TSchema extends v.GenericSchema>(tool: McpTool<TSchema>): McpTool {
  return tool as unknown as McpTool
}

export type McpServerInfo = {
  name: string
  title: string
  version: string
  instructions: string
}

type JsonRpcId = string | number
type JsonRpcResponse =
  | { jsonrpc: '2.0'; id: JsonRpcId | null; result: unknown }
  | { jsonrpc: '2.0'; id: JsonRpcId | null; error: { code: number; message: string } }

export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']
const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0]

const JsonRpcRequestSchema = v.object({
  jsonrpc: v.literal('2.0'),
  id: v.optional(v.union([v.string(), v.number()])),
  method: v.string(),
  params: v.optional(v.record(v.string(), v.unknown())),
})

class JsonRpcError extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message)
  }
}

function toolResult(value: unknown) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  const structured =
    typeof value === 'object' && value !== null && !Array.isArray(value)
      ? { structuredContent: value }
      : Array.isArray(value)
        ? { structuredContent: { items: value } }
        : {}
  return { content: [{ type: 'text', text }], ...structured }
}

async function dispatch(
  method: string,
  params: Record<string, unknown>,
  info: McpServerInfo,
  tools: McpTool[],
): Promise<unknown> {
  switch (method) {
    case 'initialize': {
      const requested = params.protocolVersion
      const protocolVersion =
        typeof requested === 'string' && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : LATEST_PROTOCOL_VERSION
      return {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: info.name, title: info.title, version: info.version },
        instructions: info.instructions,
      }
    }
    case 'ping':
      return {}
    case 'tools/list':
      return {
        tools: tools.map(tool => ({
          name: tool.name,
          title: tool.title,
          description: tool.description,
          inputSchema: toJsonSchema(tool.inputSchema, { errorMode: 'ignore' }),
          annotations: { readOnlyHint: true, openWorldHint: false },
        })),
      }
    case 'tools/call': {
      const tool = tools.find(t => t.name === params.name)
      if (!tool) throw new JsonRpcError(-32602, `Unknown tool: ${String(params.name)}`)
      const parsed = safeValidateUnknown(tool.inputSchema, params.arguments ?? {})
      if (!parsed.success) {
        // 入力の誤りはモデルが読んで直せるよう、プロトコルエラーではなくツールのエラーとして返す
        return {
          content: [
            {
              type: 'text',
              text: `Invalid arguments: ${parsed.issues.map(issue => issue.message).join('; ')}`,
            },
          ],
          isError: true,
        }
      }
      return toolResult(await tool.handler(parsed.output))
    }
    default:
      throw new JsonRpcError(-32601, `Method not found: ${method}`)
  }
}

/**
 * JSON-RPC のメッセージを 1 つ処理する。通知 (id なし) には null を返す。
 * セッションを持たない Streamable HTTP サーバーとして、SSE は使わず JSON で応答する。
 */
export async function handleMcpMessage(
  message: unknown,
  info: McpServerInfo,
  tools: McpTool[],
): Promise<JsonRpcResponse | null> {
  const request = safeValidateUnknown(JsonRpcRequestSchema, message)
  if (!request.success) {
    return { jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid Request' } }
  }
  const { id, method, params } = request.output
  if (id === undefined) return null

  try {
    const result = await dispatch(method, params ?? {}, info, tools)
    return { jsonrpc: '2.0', id, result }
  } catch (e) {
    if (e instanceof JsonRpcError) {
      return { jsonrpc: '2.0', id, error: { code: e.code, message: e.message } }
    }
    console.error(e)
    return { jsonrpc: '2.0', id, error: { code: -32603, message: 'Internal error' } }
  }
}
