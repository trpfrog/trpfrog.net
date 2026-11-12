import { createHash } from 'node:crypto'

import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { MCP_ENDPOINT } from '@/lib/mcp/server'

export const SITE_SKILL_NAME = 'trpfrog-net'
export const SITE_SKILL_DESCRIPTION =
  'つまみ (tsmami / trpfrog) やつまみネット (trpfrog.net) について調べるとき、ブログ記事を探して読むときに使う。HTML を読まずに Markdown・公開 API・MCP で取得する方法をまとめている。'

/** 人間とエージェントの両方に向けた、API と MCP のドキュメント。/docs/api と SKILL.md で使う */
export const API_DOCS_MARKDOWN = `つまみネット (${PRODUCTION_ORIGIN}) は、つまみ (tsmami / trpfrog) の個人サイトです。
ブログ記事やサイトの情報を、エージェントが HTML をスクレイピングせずに読めるようにしています。

## いつ使うか

- つまみ (tsmami / trpfrog) がどんな人か、何を作っているかを調べるとき
- つまみネットのブログ記事を探す・読む・要約するとき (徒歩・旅行・技術・大学生活などの記事があります)
- つまみネットのページの内容を確認するとき

つまみネットと関係のない一般的な調べものには向いていません。

## Markdown で読む

- どのページも \`Accept: text/markdown\` を付けてリクエストすると、同じ URL で Markdown が返ります
- ブログ記事は \`${PRODUCTION_ORIGIN}/blog/<slug>.md\` でも取得できます
- サイトの概要は \`${PRODUCTION_ORIGIN}/llms.txt\`、ページの一覧は \`${PRODUCTION_ORIGIN}/sitemap.xml\` にあります

## 公開 API

認証不要・読み取り専用の REST API です。OpenAPI の定義は \`${PRODUCTION_ORIGIN}/api/v1/openapi.json\` にあります。

| メソッド | パス | 説明 |
| --- | --- | --- |
| GET | \`/api/v1/blog/posts?q=<キーワード>&tag=<タグ>&limit=<件数>\` | 記事を新しい順に検索する |
| GET | \`/api/v1/blog/posts/<slug>\` | 記事のメタデータと Markdown 本文 |
| GET | \`/api/v1/blog/tags\` | タグと記事数 |
| GET | \`/api/v1/health\` | 稼働状況 |

\`\`\`sh
curl '${PRODUCTION_ORIGIN}/api/v1/blog/posts?q=徒歩&limit=5'
\`\`\`

エラーは RFC 9457 の \`application/problem+json\` で返し、\`code\` に機械可読なエラーコードを入れます。

| code | ステータス | 意味 |
| --- | --- | --- |
| \`invalid_query\` | 400 | クエリパラメータが不正 |
| \`post_not_found\` | 404 | 指定した slug の記事がない |
| \`route_not_found\` | 404 | 存在しないエンドポイント |
| \`internal_error\` | 500 | 予期しないエラー |

互換性のない変更はパスのメジャーバージョン (\`/api/v1\`, \`/api/v2\`, ...) を上げて行います。
古いバージョンを廃止するときは、90 日以上前から \`Deprecation\` と \`Sunset\` ヘッダーで告知します。

## MCP サーバー

Streamable HTTP の MCP サーバーが \`${MCP_ENDPOINT}\` にあります (認証不要)。

| ツール | 説明 |
| --- | --- |
| \`search_blog_posts\` | 記事をキーワード・タグで検索する |
| \`get_blog_post\` | 記事の Markdown 本文を読む |
| \`list_blog_tags\` | タグと記事数を一覧する |
| \`get_site_overview\` | サイトと著者の概要、最新記事 |

\`\`\`sh
claude mcp add --transport http trpfrog-net ${MCP_ENDPOINT}
\`\`\`

## 発見用のファイル

- API Catalog (RFC 9727): \`${PRODUCTION_ORIGIN}/.well-known/api-catalog\`
- MCP Server Card: \`${MCP_ENDPOINT}/server-card\`
- Agent Skills: \`${PRODUCTION_ORIGIN}/.well-known/agent-skills/index.json\`
`

/** Agent Skills Discovery で配る SKILL.md */
export const SITE_SKILL_MD = `---
name: ${SITE_SKILL_NAME}
description: ${SITE_SKILL_DESCRIPTION}
---

# つまみネット (trpfrog.net) を読む

${API_DOCS_MARKDOWN}`

export const SITE_SKILL_DIGEST = `sha256:${createHash('sha256').update(SITE_SKILL_MD).digest('hex')}`
