import { zValidator } from '@hono/zod-validator'
import { readBlogPost } from '@trpfrog.net/posts/fs'
import { Hono } from 'hono'
import { z } from 'zod'

export const app = new Hono()
  .get('/', c => c.json({ message: 'Hello from the blog API!' }))
  .get(
    'posts/:slug',
    zValidator(
      'param',
      z.object({
        slug: z.string(),
      }),
    ),
    async c => {
      const { slug } = c.req.param()
      try {
        const post = await readBlogPost(slug, {
          all: true,
        })
        return c.json(post)
      } catch (e) {
        console.error(e)
        return c.notFound()
      }
    },
  )
  .get('posts/:slug/all', c => {
    const { slug } = c.req.param()
    return c.redirect(`/blog/posts/${slug}`)
  })
  .get(
    'posts/:slug/:page',
    zValidator(
      'param',
      z.object({
        slug: z.string(),
        page: z.coerce.number().int().min(1),
      }),
    ),
    async c => {
      const { slug, page } = c.req.valid('param')
      try {
        const post = await readBlogPost(slug, {
          pagePos1Indexed: page,
        })
        return c.json(post)
      } catch (e) {
        console.error(e)
        return c.notFound()
      }
    },
  )
