import { cacheTags } from '@trpfrog.net/constants'
import { createContentServerClient } from '@trpfrog.net/content-server'
import { notFound } from 'next/navigation'

import { env } from '@/env/server.ts'

import type { BlogPost } from '@trpfrog.net/posts'

const client = createContentServerClient(process.env.NODE_ENV)

export async function fetchPost(slug: string, page?: number | 'all'): Promise<BlogPost> {
  if (process.env.NODE_ENV === 'development' && env.USE_DEV_REALTIME_BLOG_PREVIEW) {
    const { readBlogPost } = await import('@trpfrog.net/posts/fs')
    return page === 'all'
      ? readBlogPost(slug, { all: true })
      : readBlogPost(slug, { pagePos1Indexed: page ?? 1 })
  }

  const tags = [cacheTags.entireBlog.tag, cacheTags.blogSlug.tag(slug)]

  const post = await client.alpha.posts[':slug']
    .$get(
      { param: { slug }, query: { page: page?.toString() ?? '1' } },
      { fetch, init: { next: { tags, revalidate: 2592000 } } },
    )
    .then(async e => e.json())

  if ('error' in post) {
    return notFound()
  }
  return post
}

export async function fetchPostList(tag?: string): Promise<BlogPost[]> {
  if (process.env.NODE_ENV === 'development' && env.USE_DEV_REALTIME_BLOG_PREVIEW) {
    const { readAllBlogPosts } = await import('@trpfrog.net/posts/fs')
    return readAllBlogPosts({ tag })
  }

  const tags = [cacheTags.entireBlog.tag, cacheTags.blogList.tag]
  return await client.alpha.posts
    .$get({ query: tag ? { tag } : {} }, { init: { next: { tags, revalidate: 2592000 } } })
    .then(e => e.json())
}

export async function fetchSlugs(): Promise<string[]> {
  if (process.env.NODE_ENV === 'development' && env.USE_DEV_REALTIME_BLOG_PREVIEW) {
    const { readAllSlugs } = await import('@trpfrog.net/posts/fs')
    return readAllSlugs()
  }

  const tags = [cacheTags.entireBlog.tag, cacheTags.blogList.tag]
  return await client.alpha.slugs
    .$get({
      init: { next: { tags, revalidate: 2592000 } },
    })
    .then(e => e.json())
}
