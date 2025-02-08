interface CacheTag {
  tag: string | ((s: string) => string)
  description: string
}

export const cacheTags = {
  date: {
    tag: 'date',
    description: '誕生日・Copyright の年など、日付関連のキャッシュ',
  },
  entireBlog: {
    tag: 'entire-blog',
    description: 'ブログ記事全部',
  },
  blogList: {
    tag: 'blog-list',
    description: 'ブログ記事一覧',
  },
  blogSlug: {
    tag: (slug: string) => `blog-slug:${slug}` as const,
    description: '特定のブログ記事',
  },
  allOgp: {
    tag: 'all-ogp',
    description: '全ての OGP',
  },
  ogp: {
    tag: (url: string) => `ogp:${url}` as const,
    description: '特定の OGP',
  },
} as const satisfies Record<string, CacheTag>

interface CachedPath {
  path: string
  description: string
}

export const cachedPaths: Record<string, CachedPath> = {} as const satisfies Record<
  string,
  CachedPath
>
