import { fetchCandidatePaths } from '@/app/fuzzy/paths'
import { fetchBlogPostMarkdown } from '@/lib/agent-api/blog'
import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { fetchPostList } from '@blog/rpc'

import {
  buildBlogIndexMarkdown,
  buildHomeMarkdown,
  buildNoMarkdownVersionMarkdown,
  buildNotFoundMarkdown,
} from './documents'
import { parseBlogPath } from './paths'

// 存在しない URL でも 404 にならない動的ルート
const DYNAMIC_PATH_PREFIXES = ['/blog/tags/', '/blog/preview/', '/docs/', '/fuzzy/']

async function isKnownPage(path: string): Promise<boolean> {
  if (DYNAMIC_PATH_PREFIXES.some(prefix => path.startsWith(prefix))) return true
  return (await fetchCandidatePaths()).includes(path)
}

/** ページの Markdown 版を作る。存在しないページなら 404 の Markdown を返す */
export async function resolveMarkdown(path: string): Promise<{ body: string; status: 200 | 404 }> {
  if (path === '/') return { body: buildHomeMarkdown(await fetchPostList()), status: 200 }
  if (path === '/blog') return { body: buildBlogIndexMarkdown(await fetchPostList()), status: 200 }

  const blog = parseBlogPath(path)
  if (blog) {
    const markdown = await fetchBlogPostMarkdown(blog.slug, blog.page)
    return markdown
      ? { body: markdown, status: 200 }
      : { body: buildNotFoundMarkdown(path), status: 404 }
  }
  if (await isKnownPage(path)) {
    return { body: buildNoMarkdownVersionMarkdown(`${PRODUCTION_ORIGIN}${path}`), status: 200 }
  }
  return { body: buildNotFoundMarkdown(path), status: 404 }
}
