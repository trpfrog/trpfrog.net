import { cacheTags } from '@trpfrog.net/constants'
import { createContentServerClient } from '@trpfrog.net/content-server'

import type { BlogPost } from '@trpfrog.net/posts'

const client = createContentServerClient(process.env.NODE_ENV)

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

export async function fetchPostDetail(slug: string) {
  return client.alpha.posts[':slug'].$get({ param: { slug }, query: {} }).then(async e => e.json())
}
