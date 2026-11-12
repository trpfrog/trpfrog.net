import { describeTool } from '@/lib/mcp/protocol'
import { MCP_TOOLS } from '@/lib/mcp/server'
import { registerWebMcpTools } from '@/lib/mcp/web-mcp'

/** 引数を JSON にしてスクリプトに埋め込む。`</script>` で閉じられないよう `<` をエスケープする */
function toInlineScript<TArgs extends unknown[]>(fn: (...args: TArgs) => void, ...args: TArgs) {
  const json = (JSON.stringify(args) ?? '[]').replaceAll('<', '\\u003c')
  return `(${fn.toString()})(...${json})`
}

/**
 * MCP サーバーのツールを WebMCP でも公開する。
 * エージェントはページ読み込み直後にツールを探すので、ハイドレーションを待たずに <head> のスクリプトで登録する。
 */
export function WebMcpScript() {
  const script = toInlineScript(registerWebMcpTools, MCP_TOOLS.map(describeTool), '/mcp')
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
