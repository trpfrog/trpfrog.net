// alpha-router.ts -- 仮の機能を提供するためのルーター あとでなんとかする

import { vValidator } from '@hono/valibot-validator'
import { buildBlogPost, InvalidPagePositionError } from '@trpfrog.net/posts'
import { vCoerceNumber } from '@trpfrog.net/utils/valibot'
import { Hono } from 'hono'
import * as v from 'valibot'

import { Env } from './env'
import { createAssetsClient } from './ssg'

export const alphaApp = new Hono<Env>()
  .get('/slugs', async c => {
    const { assets, fetchAsset } = createAssetsClient(c)
    const slugs = await fetchAsset(assets.slugs)
    return c.json(slugs.filter(s => !s.startsWith('_')))
  })
  .get('/tags', async c => {
    const { assets, fetchAsset } = createAssetsClient(c)
    const tags = await fetchAsset(assets.tags)
    return c.json(tags)
  })
  .get(
    '/posts',
    vValidator(
      'query',
      v.object({
        tag: v.optional(v.string()),
      }),
    ),
    async c => {
      const { assets, fetchAsset } = createAssetsClient(c)
      const posts = await fetchAsset(assets.posts)
      const tag = c.req.valid('query').tag
      return tag ? c.json(posts.filter(p => p.tags.includes(tag))) : c.json(posts)
    },
  )
  .get(
    '/posts/:slug',
    vValidator(
      'query',
      v.object({
        page: v.optional(
          v.union([v.pipe(vCoerceNumber, v.integer(), v.minValue(1)), v.literal('all')]),
          'all',
        ),
      }),
    ),
    async c => {
      const { assets, fetchAsset } = createAssetsClient(c)
      const slug = c.req.param('slug')
      try {
        const post = await fetchAsset(assets.posts[':slug'], {
          param: { slug },
        })
        if ('error' in post) {
          return c.json(post, { status: 404 })
        }
        const page = c.req.valid('query').page
        if (page === 'all') {
          return c.json(buildBlogPost(slug, post.content, { all: true }))
        } else {
          return c.json(buildBlogPost(slug, post.content, { pagePos1Indexed: page }))
        }
      } catch (e) {
        if (e instanceof InvalidPagePositionError) {
          return c.json({ error: e.message }, { status: 400 })
        }
        return c.json({ error: 'Not found' }, { status: 404 })
      }
    },
  )
