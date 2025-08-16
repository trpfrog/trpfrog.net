// This middleware is imported from the main middleware file `@/middleware.ts`
import { createContentServerClient } from '@trpfrog.net/content-server'
import { safeValidate } from '@trpfrog.net/utils'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

// FIXME: gray-matter を import すると edge 環境ではビルドできない
// ここではファイルを指定して読み込み、gray-matter の import を回避している
import {
  BLOG_PAGE_NUMBER__ALL,
  BlogPageNumberSchema,
} from '../../../../../packages/posts/src/core/blogPost.ts'

const MARKDOWN_EXT = '.md'

const stripMdSuffix = (s: string) =>
  s.endsWith(MARKDOWN_EXT) ? s.slice(0, -MARKDOWN_EXT.length) : s

const blogPostClient = createContentServerClient(process.env.NODE_ENV)
async function fetchBlogPostMarkdown(slug: string, page?: string) {
  try {
    const queryPageParseResult = safeValidate(BlogPageNumberSchema, page ?? BLOG_PAGE_NUMBER__ALL)
    if (!queryPageParseResult.success) {
      throw new HTTPException(400, {
        message: `Invalid page parameter: ${page}. Expected a number or 'all'.`,
      })
    }

    // TODO: Node.js Middleware が使えるようになったら `fetchPost` を使う
    const res = await blogPostClient.alpha.posts[':slug'].$get(
      {
        param: { slug },
        query: { page: queryPageParseResult.output.toString() },
      },
      {
        fetch,
        init: {
          next: {
            tags: ['blog', `blog:${slug}`],
            revalidate: 60 * 60 * 24 * 30, // 30d,
          },
        },
      },
    )

    const json = await res.json()
    if ('error' in json) {
      console.error(
        `Failed to fetch blog post markdown for slug: ${slug}, page: ${page}`,
        json.error,
      )
      return null
    }
    return json.markdown
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

    console.log({ slug, page })

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
