import { cacheTags } from '@trpfrog.net/constants'
import { createContentServerClient } from '@trpfrog.net/content-server'
import { type BlogPost, BLOG_PAGE_NUMBER__1, BlogPageNumber } from '@trpfrog.net/posts'
import { notFound } from 'next/navigation'

const client = createContentServerClient(process.env.NODE_ENV)
const revalidatePeriod = process.env.NODE_ENV === 'development' ? 0 : 2592000 // 30 days

export async function fetchPost(
  slug: string,
  page: BlogPageNumber = BLOG_PAGE_NUMBER__1,
): Promise<BlogPost> {
  const tags = [cacheTags.entireBlog.tag, cacheTags.blogSlug.tag(slug)]

  const post = await client.alpha.posts[':slug']
    .$get(
      { param: { slug }, query: { page: page.toString() } },
      { fetch, init: { next: { tags, revalidate: revalidatePeriod } } },
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
    .$get({ query: tag ? { tag } : {} }, { init: { next: { tags, revalidate: revalidatePeriod } } })
    .then(e => e.json())
}

export async function fetchSlugs(): Promise<string[]> {
  const tags = [cacheTags.entireBlog.tag, cacheTags.blogList.tag]
  return await client.alpha.slugs
    .$get({}, { init: { next: { tags, revalidate: revalidatePeriod } } })
    .then(e => e.json())
}
