// WebMCP (https://webmachinelearning.github.io/webmcp/) に対応したブラウザで、サイトの機能をエージェントにツールとして公開する。
// エージェントはページ読み込み直後にツールを探すので、ハイドレーションを待たずに <head> のスクリプトで登録する。
const SCRIPT = `(() => {
  const mc = navigator.modelContext || document.modelContext
  if (!mc) return
  const getJson = path => fetch(path).then(res => res.json())
  const tools = [
    {
      name: 'search_blog_posts',
      description: 'つまみネットのブログ記事を新しい順に検索する。query はタイトル・説明・タグに対する空白区切りの AND 検索。',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '検索キーワード' },
          tag: { type: 'string', description: 'このタグを持つ記事に絞り込む' },
          limit: { type: 'integer', minimum: 1, maximum: 100, description: '件数の上限' },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async ({ query, tag, limit } = {}) => {
        const params = new URLSearchParams()
        if (typeof query === 'string') params.set('q', query)
        if (typeof tag === 'string') params.set('tag', tag)
        params.set('limit', String(typeof limit === 'number' ? limit : 20))
        return await getJson('/api/v1/blog/posts?' + params)
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
      execute: async ({ slug }) => await getJson('/api/v1/blog/posts/' + encodeURIComponent(String(slug))),
    },
    {
      name: 'open_page',
      description: 'つまみネット内のページを開く。path は /blog や /blog/<slug> のようなサイト内のパス。',
      inputSchema: {
        type: 'object',
        properties: { path: { type: 'string', description: '/ から始まるサイト内のパス' } },
        required: ['path'],
      },
      execute: async ({ path }) => {
        if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
          return { error: 'path must be a site-relative path starting with /' }
        }
        location.assign(path)
        return { opened: path }
      },
    },
  ]
  try {
    if (typeof mc.registerTool === 'function') {
      for (const tool of tools) Promise.resolve(mc.registerTool(tool)).catch(() => {})
    } else if (typeof mc.provideContext === 'function') {
      mc.provideContext({ tools })
    }
  } catch {
    // 策定中の API なので、登録に失敗してもページの表示は続ける
  }
})()`

export function WebMcpScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
