import { createContentServerClient } from '@trpfrog.net/content-server'

import type { BlogPost } from '@trpfrog.net/posts'

const client = createContentServerClient(process.env.NODE_ENV)

export async function fetchPostList(tag?: string): Promise<BlogPost[]> {
  return await client.alpha.posts.$get({ query: tag ? { tag } : {} }).then(e => e.json())
}

export async function fetchSlugs(): Promise<string[]> {
  return await client.alpha.slugs.$get().then(e => e.json())
}

export async function fetchPostDetail(slug: string) {
  return client.alpha.posts[':slug'].$get({ param: { slug }, query: {} }).then(async e => e.json())
}
