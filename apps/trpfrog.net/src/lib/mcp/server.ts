import * as v from 'valibot'

import { getPost, listTags, searchPosts } from '@/lib/agent-api/blog'
import { buildHomeMarkdown } from '@/lib/agent-markdown/documents'
import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { SITE_PROFILE } from '@/lib/site-profile'
import { fetchPostList } from '@blog/rpc'

import { defineTool, type McpServerInfo, SUPPORTED_PROTOCOL_VERSIONS } from './protocol'

export const MCP_ENDPOINT = `${PRODUCTION_ORIGIN}/mcp`

export const MCP_SERVER_INFO: McpServerInfo = {
  name: 'net.trpfrog/site',
  title: `${SITE_PROFILE.name} MCP`,
  version: '1.0.0',
  instructions: [
    `${SITE_PROFILE.name} (${SITE_PROFILE.url}) は ${SITE_PROFILE.author.name} の個人サイトです。`,
    'search_blog_posts で記事を探し、get_blog_post で本文を Markdown で読めます。',
    'サイトの概要や著者について聞かれたら get_site_overview を使ってください。',
  ].join('\n'),
}

export const MCP_TOOLS = [
  defineTool({
    name: 'search_blog_posts',
    title: 'ブログ記事を検索',
    description:
      'つまみネットのブログ記事を新しい順に検索する。query はタイトル・説明・タグに対する空白区切りの AND 検索。何も指定しなければ最新の記事を返す。',
    inputSchema: v.object({
      query: v.optional(v.pipe(v.string(), v.description('検索キーワード'))),
      tag: v.optional(v.pipe(v.string(), v.description('このタグを持つ記事に絞り込む'))),
      limit: v.optional(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(1),
          v.maxValue(100),
          v.description('件数の上限'),
        ),
        20,
      ),
    }),
    handler: async ({ query, tag, limit }) => await searchPosts({ query, tag, limit }),
  }),
  defineTool({
    name: 'get_blog_post',
    title: 'ブログ記事を読む',
    description: 'slug を指定して、ブログ記事のメタデータと Markdown 本文を取得する。',
    inputSchema: v.object({
      slug: v.pipe(v.string(), v.minLength(1), v.description('記事の slug (URL の /blog/<slug>)')),
    }),
    handler: async ({ slug }) => (await getPost(slug)) ?? `Blog post not found: ${slug}`,
  }),
  defineTool({
    name: 'list_blog_tags',
    title: 'ブログのタグ一覧',
    description: 'ブログのタグを、記事数の多い順に一覧する。',
    inputSchema: v.object({}),
    handler: async () => await listTags(),
  }),
  defineTool({
    name: 'get_site_overview',
    title: 'サイトの概要',
    description:
      'つまみネットと著者 (つまみ / trpfrog) の紹介、主なページ、最新記事を Markdown で返す。',
    inputSchema: v.object({}),
    handler: async () => buildHomeMarkdown(await fetchPostList()),
  }),
]

/** MCP Server Card (SEP-2127) */
export const MCP_SERVER_CARD = {
  $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
  name: MCP_SERVER_INFO.name,
  title: MCP_SERVER_INFO.title,
  description: 'つまみネットのブログ記事の検索・閲覧とサイト情報の取得',
  version: MCP_SERVER_INFO.version,
  websiteUrl: PRODUCTION_ORIGIN,
  repository: { source: 'github', url: 'https://github.com/trpfrog/trpfrog.net' },
  remotes: [
    {
      type: 'streamable-http',
      url: MCP_ENDPOINT,
      supportedProtocolVersions: SUPPORTED_PROTOCOL_VERSIONS,
    },
  ],
}
