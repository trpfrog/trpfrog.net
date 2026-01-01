import {
  readAllBlogPosts,
  readAllSlugs,
  readMarkdownFromSlug,
  retrieveExistingAllTags,
} from '@trpfrog.net/posts/fs'
import { Hono } from 'hono'
import { ssgParams } from 'hono/ssg'

export const ssgAssetsRoute = new Hono()
  .get('/slugs', async c => {
    const posts = await readAllBlogPosts({
      order: 'desc',
    })
    return c.json(posts.map(p => p.slug).filter(s => !s.startsWith('_')))
  })
  .get('/tags', async c => {
    const tags = await retrieveExistingAllTags()
    return c.json(tags)
  })
  .get('/posts', async c => {
    const posts = await readAllBlogPosts({
      order: 'desc',
    })
    return c.json(posts.filter(p => !p.slug.startsWith('_')))
  })
  .get(
    '/posts/:slug',
    ssgParams(async () => {
      const slugs = await readAllSlugs()
      return slugs.filter(s => !s.startsWith('_')).map(slug => ({ slug }))
    }),
    async c => {
      const slug = c.req.param('slug')
      try {
        const fileContents = await readMarkdownFromSlug(slug)
        return c.json({
          content: fileContents,
        })
      } catch {
        return c.json({ error: 'Not found' }, { status: 404 })
      }
    },
  )
