import { Hono } from 'hono'

import { markdownNegotiation, rewriteToMarkdown } from '@/lib/agent-markdown/middleware'
import { createNextProxy } from '@/lib/next-hono-proxy'

const app = new Hono()

// keep kawaii query parameter
const KAWAII_QUERY_PARAM = 'kawaii'
app.use(async (c, next) => {
  try {
    const referer = c.req.header('referer')
    const refererUrl = referer ? new URL(referer) : null
    const nextUrl = new URL(c.req.url)
    if (
      referer &&
      refererUrl?.searchParams.get(KAWAII_QUERY_PARAM) === 'true' &&
      !nextUrl.searchParams.has(KAWAII_QUERY_PARAM)
    ) {
      nextUrl.searchParams.set(KAWAII_QUERY_PARAM, 'true')
      return c.redirect(nextUrl.toString())
    }
  } catch {
    // ignore
  }
  await next()
})

// Accept: text/markdown なら同じ URL で Markdown を返す
app.use(markdownNegotiation())

// ブログの URL の末尾に `.md` がついている場合は Markdown を返す
app.get('/blog/:slug{.+\\.md}', rewriteToMarkdown)
app.get('/blog/:slug/:page{.+\\.md}', rewriteToMarkdown)

app.get('/tweets/*', c => {
  return c.text('Under construction...')
})

export default createNextProxy(app).proxy
