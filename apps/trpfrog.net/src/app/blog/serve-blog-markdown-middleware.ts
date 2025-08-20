// This middleware is imported from the main middleware file `@/middleware.ts`
import { BLOG_PAGE_NUMBER__ALL, BlogPageNumberSchema } from '@trpfrog.net/posts'
import { safeValidate } from '@trpfrog.net/utils'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

import { fetchPost } from './rpc.ts'

const MARKDOWN_EXT = '.md'

const stripMdSuffix = (s: string) =>
  s.endsWith(MARKDOWN_EXT) ? s.slice(0, -MARKDOWN_EXT.length) : s

async function fetchBlogPostMarkdown(slug: string, page?: string) {
  try {
    const queryPageParseResult = safeValidate(BlogPageNumberSchema, page ?? BLOG_PAGE_NUMBER__ALL)
    if (!queryPageParseResult.success) {
      throw new HTTPException(400, {
        message: `Invalid page parameter: ${page}. Expected a number or 'all'.`,
      })
    }

    const { markdown } = await fetchPost(slug, queryPageParseResult.output)
    return markdown
  } catch (error) {
    console.error(`Failed to fetch blog post markdown for slug: ${slug}, page: ${page}`, error)
    return null
  }
}

export function serveBlogMarkdownMiddleware() {
  return createMiddleware(async (c, next) => {
    const slug = c.req.param('slug')
    const page = c.req.param('page')

    if (!slug) return await next()

    let markdown: string | null = null
    if (page && page.endsWith(MARKDOWN_EXT)) {
      const cleanPage = stripMdSuffix(page)
      markdown = await fetchBlogPostMarkdown(slug, cleanPage)
    } else if (!page && slug.endsWith(MARKDOWN_EXT)) {
      const cleanSlug = stripMdSuffix(slug)
      markdown = await fetchBlogPostMarkdown(cleanSlug)
    }

    if (!markdown) return await next()

    return c.text(markdown, {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  })
}
