import { resolveMarkdown } from '@/lib/agent-markdown/resolve'

/**
 * Proxy は Markdown を求めるリクエストを `/api/markdown/<元のパス>` へ rewrite する。
 * Proxy では `'use cache'` が効かないので、データの取得はここで行う。
 */
export async function GET(_: Request, ctx: RouteContext<'/api/markdown/[[...path]]'>) {
  const segments = (await ctx.params).path ?? []
  const path = `/${segments.map(encodeURIComponent).join('/')}`.replace(/\.md$/, '')
  const { body, status } = await resolveMarkdown(path)
  return new Response(body, { status, headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
