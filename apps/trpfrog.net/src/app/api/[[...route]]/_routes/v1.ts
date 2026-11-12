import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as v from 'valibot'

import { getPost, listTags, searchPosts } from '@/lib/agent-api/blog'
import { openApiDocument } from '@/lib/agent-api/openapi'
import { problem } from '@/lib/agent-api/problem'

const SearchPostsQuerySchema = v.object({
  q: v.optional(v.string()),
  tag: v.optional(v.string()),
  limit: v.optional(v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1), v.maxValue(1000))),
})

/** 誰でも読める、読み取り専用の公開 API (v1) */
export const app = new Hono()
  .use(cors())
  .get('/health', c => c.json({ status: 'ok' as const }))
  .get('/openapi.json', c => c.json(openApiDocument))
  .get(
    '/blog/posts',
    sValidator('query', SearchPostsQuerySchema, (result, c) => {
      if (!result.success) {
        return problem(c, 400, {
          code: 'invalid_query',
          title: 'Invalid query parameters',
          detail: result.error.map(issue => issue.message).join('; '),
          resolution: 'limit must be an integer between 1 and 1000.',
        })
      }
    }),
    async c => {
      const { q, tag, limit } = c.req.valid('query')
      return c.json(await searchPosts({ query: q, tag, limit }))
    },
  )
  .get('/blog/posts/:slug', async c => {
    const slug = c.req.param('slug')
    const post = await getPost(slug)
    if (!post) {
      return problem(c, 404, {
        code: 'post_not_found',
        title: 'Blog post not found',
        detail: `No blog post has the slug "${slug}".`,
        resolution: 'Find valid slugs with GET /api/v1/blog/posts.',
      })
    }
    return c.json(post)
  })
  .get('/blog/tags', async c => c.json(await listTags()))
