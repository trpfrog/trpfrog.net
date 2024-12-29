// alpha-router.ts -- 仮の機能を提供するためのルーター あとでなんとかする

import * as postFs from '@trpfrog.net/posts/fs'
import { Hono } from 'hono'
import { ssgParams } from 'hono/ssg'

export const alphaApp = new Hono()
  .get('/slugs', async c => {
    const slugs = await postFs.readAllSlugs()
    return c.json(slugs.filter(s => !s.startsWith('_')))
  })
  .get('/tags', async c => {
    const tags = await postFs.retrieveExistingAllTags()
    return c.json(tags)
  })
  .get(
    '/tagged-posts/:tag',
    ssgParams(async () => {
      const tags = await postFs.retrieveExistingAllTags()
      return tags.map(tag => ({ tag }))
    }),
    async c => {
      const tag = c.req.param('tag')
      const posts = await postFs.readAllBlogPosts({ tag })
      return c.json(posts.filter(p => !p.slug.startsWith('_')))
    },
  )
  .get('/posts', async c => {
    const posts = await postFs.readAllBlogPosts({
      order: 'desc',
    })
    return c.json(posts.filter(p => !p.slug.startsWith('_')))
  })
  .get(
    '/posts/:slug',
    ssgParams(async () => {
      const slugs = await postFs.readAllSlugs()
      return slugs.filter(s => !s.startsWith('_')).map(slug => ({ slug }))
    }),
    async c => {
      const slug = c.req.param('slug')
      try {
        const post = await postFs.readBlogPost(slug)
        return c.json(post)
      } catch {
        return c.notFound()
      }
    },
  )
  .get(
    '/posts/:slug/:page',
    ssgParams(async () => {
      const slugs = await postFs.readAllSlugs()
      const params: { slug: string; page: string }[] = []

      for (const slug of slugs) {
        if (slug.startsWith('_')) {
          continue
        }
        const post = await postFs.readBlogPost(slug)
        for (let i = 1; i <= post.numberOfPages; i++) {
          params.push({ slug, page: i.toString() })
        }
        params.push({ slug, page: 'all' })
      }
      return params
    }),
    async c => {
      const slug = c.req.param('slug')
      const isAll = c.req.param('page') === 'all'
      try {
        const post = await postFs.readBlogPost(slug, {
          all: isAll,
          pagePos1Indexed: isAll ? undefined : parseInt(c.req.param('page'), 10),
        })
        return c.json(post)
      } catch {
        return c.notFound()
      }
    },
  )
