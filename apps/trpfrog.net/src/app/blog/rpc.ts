import { cacheTags } from '@trpfrog.net/constants'
import { createContentServerClient } from '@trpfrog.net/content-server'
import { notFound } from 'next/navigation'

import { env } from '@/env/server.ts'

import type { BlogPost } from '@trpfrog.net/posts'

const client = createContentServerClient(env.NODE_ENV)

export async function fetchPost(slug: string, page?: number | 'all'): Promise<BlogPost> {
  const tags = [cacheTags.entireBlog.tag, cacheTags.blogSlug.tag(slug)]

  const post = await client.alpha.posts[':slug']
    .$get(
      { param: { slug }, query: { page: page?.toString() ?? '1' } },
      { init: { cache: 'force-cache', next: { tags } } },
    )
    .then(async e => e.json())

  if ('error' in post) {
    return notFound()
  }
  return post
}

export async function fetchPostList(tag?: string): Promise<BlogPost[]> {
  const tags = [cacheTags.entireBlog.tag, cacheTags.blogList.tag]
  return await client.alpha.posts
    .$get({ query: tag ? { tag } : {} }, { init: { cache: 'force-cache', next: { tags } } })
    .then(e => e.json())
}

export async function fetchSlugs(): Promise<string[]> {
  const tags = [cacheTags.entireBlog.tag, cacheTags.blogList.tag]
  return await client.alpha.slugs
    .$get({
      init: { cache: 'force-cache', next: { tags } },
    })
    .then(e => e.json())
}
