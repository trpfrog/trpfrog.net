import { NextResponse } from 'next/server'

import type { Context } from 'hono'
import { createMiddleware } from 'hono/factory'

import { prefersMarkdown } from './accept'
import { parseBlogPath } from './paths'

/** Markdown 版を返す Route Handler。Proxy では `'use cache'` が効かないので、データ取得はこちらに任せる */
const MARKDOWN_ROUTE = '/api/markdown'

const SITE_LINKS = [
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</api/v1/openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
]

/** ページ以外のリクエスト (静的ファイル・API・Next.js の内部パス) */
function isNonPageRequest(path: string): boolean {
  return (
    ['/_next/', '/api/', '/mcp'].some(prefix => path.startsWith(prefix)) || /\.[^/]+$/.test(path)
  )
}

/** そのパスの Markdown 版の URL。Markdown 版がなければ null */
function markdownAlternateOf(path: string): string | null {
  if (path === '/' || path === '/blog') return path
  if (parseBlogPath(path)) return `${path}.md`
  return null
}

function appendLinkHeader(c: Context, path: string) {
  const alternate = markdownAlternateOf(path)
  const links = alternate
    ? [`<${alternate}>; rel="alternate"; type="text/markdown"`, ...SITE_LINKS]
    : SITE_LINKS
  c.header('Link', links.join(', '), { append: true })
}

export function rewriteToMarkdown(c: Context) {
  const path = c.req.path === '/' ? '' : c.req.path
  return NextResponse.rewrite(new URL(`${MARKDOWN_ROUTE}${path}`, c.req.url))
}

/**
 * `Accept: text/markdown` を送ってきたエージェントに、同じ URL で Markdown を返す。
 * HTML を返すときも、Markdown 版やサイトマップの場所を Link ヘッダーで知らせる。
 */
export function markdownNegotiation() {
  return createMiddleware(async (c, next) => {
    const path = c.req.path
    if (!['GET', 'HEAD'].includes(c.req.method) || isNonPageRequest(path)) {
      return await next()
    }
    if (prefersMarkdown(c.req.header('accept'))) {
      c.res = rewriteToMarkdown(c)
    } else {
      await next()
    }
    appendLinkHeader(c, path)
  })
}
