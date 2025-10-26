// alpha-router.ts -- 仮の機能を提供するためのルーター あとでなんとかする

import * as postFs from '@trpfrog.net/posts/fs'
import { Context, Hono } from 'hono'
import { hc, InferResponseType } from 'hono/client'
import { onlySSG, ssgParams } from 'hono/ssg'

import { Env } from './env'

const alphaApp = new Hono()
  .get('/slugs', async c => {
    const posts = await postFs.readAllBlogPosts({
      order: 'desc',
    })
    return c.json(posts.map(p => p.slug).filter(s => !s.startsWith('_')))
  })
  .get('/tags', async c => {
    const tags = await postFs.retrieveExistingAllTags()
    return c.json(tags)
  })
  .get('/posts', onlySSG(), async c => {
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
    c => {
      const slug = c.req.param('slug')
      try {
        const fileContents = postFs.readMarkdownFromSlug(slug)
        return c.json({
          content: fileContents,
        })
      } catch {
        return c.json({ error: 'Not found' }, { status: 404 })
      }
    },
  )

const app = new Hono().route('/assets', alphaApp)

export function createAssetsClient(c: Context<Env>) {
  const client = hc<typeof app>(new URL(c.req.url).origin)
  return {
    assets: client.assets,
    fetchAsset: async <
      T extends {
        $get: unknown
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $url: (params: any) => URL
      },
    >(
      partialClient: T,
      params?: Parameters<T['$url']>[0],
    ): Promise<InferResponseType<T['$get']>> => {
      const url = partialClient.$url(params).toString() + '.json'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- Avoid type error in Next.js
      return c.env.ASSETS.fetch(url).then(async e => e.json())
    },
  }
}

// eslint-disable-next-line no-restricted-exports
export default app
