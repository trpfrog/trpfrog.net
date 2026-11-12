import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as v from 'valibot'

import { getPost, listTags, searchPosts } from '@/lib/agent-api/blog'

export const SearchPostsQuerySchema = v.object({
  q: v.optional(v.string()),
  tag: v.optional(v.string()),
  limit: v.optional(v.pipe(v.string(), v.toNumber(), v.integer(), v.minValue(1), v.maxValue(1000))),
})

/** 誰でも読める、ブログ記事の読み取り専用 API */
export const app = new Hono()
  .use(cors())
  .get('/posts', sValidator('query', SearchPostsQuerySchema), async c => {
    const { q, tag, limit } = c.req.valid('query')
    return c.json(await searchPosts({ query: q, tag, limit }))
  })
  .get('/posts/:slug', async c => {
    const post = await getPost(c.req.param('slug'))
    return post ? c.json(post) : c.json({ error: 'Not found' }, 404)
  })
  .get('/tags', async c => c.json(await listTags()))
