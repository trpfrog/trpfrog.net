import { cacheTags } from '@trpfrog.net/constants'
import { createContentServerClient } from '@trpfrog.net/content-server'
import { type BlogPost, BLOG_PAGE_NUMBER__1, BlogPageNumber } from '@trpfrog.net/posts'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'

const client = createContentServerClient(process.env.NODE_ENV)

export async function fetchPost(
  slug: string,
  page: BlogPageNumber = BLOG_PAGE_NUMBER__1,
): Promise<BlogPost> {
  'use cache'
  cacheTag(cacheTags.entireBlog.tag, cacheTags.blogSlug.tag(slug))
  cacheLife('cache-if-production')

  const post = await client.alpha.posts[':slug']
    .$get({ param: { slug }, query: { page: page.toString() } })
    .then(async e => e.json())

  if ('error' in post) {
    return notFound()
  }
  return post
}

export async function fetchPostList(tag?: string): Promise<BlogPost[]> {
  'use cache'
  cacheTag(cacheTags.entireBlog.tag, cacheTags.blogList.tag)
  cacheLife('cache-if-production')

  return await client.alpha.posts.$get({ query: tag ? { tag } : {} }).then(e => e.json())
}

export async function fetchSlugs(): Promise<string[]> {
  'use cache'
  cacheTag(cacheTags.entireBlog.tag, cacheTags.blogList.tag)
  cacheLife('cache-if-production')

  return await client.alpha.slugs.$get().then(e => e.json())
}
