import { createHash } from 'node:crypto'

import { PRODUCTION_ORIGIN } from '@/lib/constants'
import { MCP_ENDPOINT } from '@/lib/mcp/server'

export const SITE_SKILL_NAME = 'trpfrog-net'
export const SITE_SKILL_DESCRIPTION =
  'つまみネット (trpfrog.net) のブログ記事やサイト情報を、Markdown・公開 API・MCP で読む方法。つまみ (trpfrog) や trpfrog.net について調べるときに使う。'

/** Agent Skills Discovery で配る SKILL.md */
export const SITE_SKILL_MD = `---
name: ${SITE_SKILL_NAME}
description: ${SITE_SKILL_DESCRIPTION}
---

# trpfrog.net を読む

つまみネット (${PRODUCTION_ORIGIN}) は、つまみ (tsmami / trpfrog) の個人サイトです。
HTML をスクレイピングせず、次の方法でエージェント向けの形式を取得してください。

## Markdown で読む

- どのページも \`Accept: text/markdown\` を付けてリクエストすると Markdown が返ります。
- ブログ記事は \`${PRODUCTION_ORIGIN}/blog/<slug>.md\` でも取得できます。
- サイトの概要は \`${PRODUCTION_ORIGIN}/llms.txt\`、ページの一覧は \`${PRODUCTION_ORIGIN}/sitemap.xml\` にあります。

## 公開 API

認証不要・読み取り専用です。定義は \`${PRODUCTION_ORIGIN}/api/openapi.json\` にあります。

- \`GET /api/blog/posts?q=<キーワード>&tag=<タグ>&limit=<件数>\`: 記事を新しい順に検索する
- \`GET /api/blog/posts/<slug>\`: 記事のメタデータと Markdown 本文
- \`GET /api/blog/tags\`: タグと記事数

## MCP

Streamable HTTP の MCP サーバーが \`${MCP_ENDPOINT}\` にあります (認証不要)。
\`search_blog_posts\`, \`get_blog_post\`, \`list_blog_tags\`, \`get_site_overview\` を使えます。
`

export const SITE_SKILL_DIGEST = `sha256:${createHash('sha256').update(SITE_SKILL_MD).digest('hex')}`
