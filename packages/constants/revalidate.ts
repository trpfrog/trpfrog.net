interface CacheTag {
  tag: string
  description: string
}

export const cacheTags = {
  date: {
    tag: 'date',
    description: '誕生日・Copyright の年など、日付関連のキャッシュ',
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
