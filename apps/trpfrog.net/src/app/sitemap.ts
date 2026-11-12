import type { MetadataRoute } from 'next'

import { getDocsPagePaths, getStaticPagePaths } from '@/app/fuzzy/paths'
import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { fetchPostList } from '@blog/rpc'

// 検索やエージェントに見せる必要のないページ
const EXCLUDED_PATH_PREFIXES = ['/fuzzy', '/blog/preview']

const toUrl = (path: string) => `${PRODUCTION_ORIGIN}${path === '/' ? '' : path}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagePaths = [...getStaticPagePaths(), ...getDocsPagePaths()].filter(
    path => !EXCLUDED_PATH_PREFIXES.some(prefix => path.startsWith(prefix)),
  )
  const posts = await fetchPostList()

  return [
    ...pagePaths.map(path => ({ url: toUrl(path) })),
    ...posts.map(post => ({
      url: toUrl(`/blog/${encodeURIComponent(post.slug)}`),
      lastModified: post.updated ?? post.date,
    })),
  ]
}
