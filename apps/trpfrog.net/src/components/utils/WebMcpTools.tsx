'use client'

import { useEffect } from 'react'

type WebMcpTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean }
  execute: (input: Record<string, unknown>) => Promise<unknown>
}

type ModelContext = {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown
}

declare global {
  interface Navigator {
    modelContext?: ModelContext
  }
  interface Document {
    modelContext?: ModelContext
  }
}

async function fetchJson(path: string) {
  const res = await fetch(path)
  return await res.json()
}

const TOOLS: WebMcpTool[] = [
  {
    name: 'search_blog_posts',
    description:
      'つまみネットのブログ記事を新しい順に検索する。query はタイトル・説明・タグに対する空白区切りの AND 検索。',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '検索キーワード' },
        tag: { type: 'string', description: 'このタグを持つ記事に絞り込む' },
        limit: { type: 'integer', minimum: 1, maximum: 100, description: '件数の上限' },
      },
    },
    annotations: { readOnlyHint: true },
    execute: async ({ query, tag, limit }) => {
      const params = new URLSearchParams()
      if (typeof query === 'string') params.set('q', query)
      if (typeof tag === 'string') params.set('tag', tag)
      params.set('limit', String(typeof limit === 'number' ? limit : 20))
      return await fetchJson(`/api/blog/posts?${params}`)
    },
  },
  {
    name: 'get_blog_post',
    description: 'slug を指定して、ブログ記事のメタデータと Markdown 本文を取得する。',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', description: '記事の slug (URL の /blog/<slug>)' } },
      required: ['slug'],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ slug }) =>
      await fetchJson(`/api/blog/posts/${encodeURIComponent(String(slug))}`),
  },
  {
    name: 'open_page',
    description:
      'つまみネット内のページを開く。path は /blog や /blog/<slug> のようなサイト内のパス。',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', description: '/ から始まるサイト内のパス' } },
      required: ['path'],
    },
    execute: async ({ path }) => {
      if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
        return { error: 'path must be a site-relative path starting with /' }
      }
      window.location.assign(path)
      return { opened: path }
    },
  },
]

/** WebMCP に対応したブラウザで、サイトの機能をエージェントにツールとして公開する */
export function WebMcpTools() {
  useEffect(() => {
    const modelContext = navigator.modelContext ?? document.modelContext
    if (!modelContext) return
    const controller = new AbortController()
    for (const tool of TOOLS) {
      try {
        void Promise.resolve(modelContext.registerTool(tool, { signal: controller.signal })).catch(
          () => {},
        )
      } catch {
        // 実装途中の API なので、登録に失敗してもページの表示は続ける
      }
    }
    return () => controller.abort()
  }, [])
  return null
}
