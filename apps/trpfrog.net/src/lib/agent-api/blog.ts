import { BLOG_PAGE_NUMBER__ALL, type BlogPost, BlogPageNumberSchema } from '@trpfrog.net/posts'
import { safeValidate } from '@trpfrog.net/utils'

import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { fetchPost, fetchPostList, fetchSlugs } from '@blog/rpc'

/** エージェントや API 利用者向けの記事の概要 */
export type PostSummary = {
  slug: string
  title: string
  description?: string
  date: string
  updated?: string
  tags: string[]
  url: string
  markdownUrl: string
}

export function toPostSummary(post: BlogPost): PostSummary {
  const url = `${PRODUCTION_ORIGIN}/blog/${encodeURIComponent(post.slug)}`
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    tags: post.tags,
    url,
    markdownUrl: `${url}.md`,
  }
}

export type SearchPostsOptions = {
  query?: string
  tag?: string
  limit?: number
}

/** 記事をタイトル・説明・タグで絞り込む。新しい順に並ぶ */
export async function searchPosts({ query, tag, limit }: SearchPostsOptions = {}) {
  const posts = await fetchPostList(tag)
  const keywords = (query ?? '').toLowerCase().split(/\s+/).filter(Boolean)
  const matched = posts.filter(post => {
    const haystack = [post.title, post.description ?? '', ...post.tags].join('\n').toLowerCase()
    return keywords.every(keyword => haystack.includes(keyword))
  })
  return matched.slice(0, limit).map(toPostSummary)
}

export async function listTags(): Promise<{ name: string; count: number }[]> {
  const counts = new Map<string, number>()
  for (const post of await fetchPostList()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

/** 記事の概要と Markdown 本文。存在しなければ null */
export async function getPost(slug: string): Promise<(PostSummary & { markdown: string }) | null> {
  if (!(await fetchSlugs()).includes(slug)) return null
  const [post, markdown] = await Promise.all([fetchPost(slug), fetchBlogPostMarkdown(slug)])
  if (markdown == null) return null
  return { ...toPostSummary(post), markdown }
}

/** 記事の Markdown。page を省略すると全ページを返す。記事やページが存在しなければ null */
export async function fetchBlogPostMarkdown(slug: string, page?: string): Promise<string | null> {
  const pageNumber = safeValidate(BlogPageNumberSchema, page ?? BLOG_PAGE_NUMBER__ALL)
  if (!pageNumber.success) return null
  if (!(await fetchSlugs()).includes(slug)) return null
  try {
    return (await fetchPost(slug, pageNumber.output)).markdown
  } catch {
    // 存在しないページ番号など
    return null
  }
}
