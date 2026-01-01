// alpha-router.ts -- 仮の機能を提供するためのルーター あとでなんとかする

import { sValidator } from '@hono/standard-validator'
import { BlogPageNumberSchema, buildBlogPost, InvalidPagePositionError } from '@trpfrog.net/posts'
import { Hono } from 'hono'
import * as v from 'valibot'

import { Env } from './env'
import { createAssetsClient } from './ssg'

export const alphaApp = new Hono<Env>()
  .get('/slugs', async c => {
    const assetsClient = createAssetsClient(c)
    const slugs = await assetsClient.fetchSlugs()
    return c.json(slugs.filter(s => !s.startsWith('_')))
  })
  .get('/tags', async c => {
    const assetsClient = createAssetsClient(c)
    const tags = await assetsClient.fetchTags()
    return c.json(tags)
  })
  .get(
    '/posts',
    sValidator(
      'query',
      v.object({
        tag: v.optional(v.string()),
      }),
    ),
    async c => {
      const assetsClient = createAssetsClient(c)
      const posts = await assetsClient.fetchPosts()
      const tag = c.req.valid('query').tag
      return tag ? c.json(posts.filter(p => p.tags.includes(tag))) : c.json(posts)
    },
  )
  .get(
    '/posts/:slug',
    sValidator(
      'query',
      v.object({
        page: v.optional(BlogPageNumberSchema, 'all'),
      }),
    ),
    async c => {
      const assetsClient = createAssetsClient(c)
      const slug = c.req.param('slug')
      try {
        const page = c.req.valid('query').page
        const content = await assetsClient.fetchContent(slug)
        return c.json(buildBlogPost(slug, content, { pagePos1Indexed: page }))
      } catch (e) {
        if (e instanceof InvalidPagePositionError) {
          return c.json({ error: e.message }, { status: 400 })
        }
        return c.json({ error: 'Not found' }, { status: 404 })
      }
    },
  )
