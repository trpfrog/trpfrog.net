import { buildHomeMarkdown } from '@/lib/agent-markdown/documents'
import { fetchPostList } from '@blog/rpc'

export async function GET() {
  return new Response(buildHomeMarkdown(await fetchPostList()), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
