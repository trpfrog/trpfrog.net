import { PRODUCTION_ORIGIN, SITE_NAME } from '@/lib/constants'

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` })

const json = (description: string, schema: object) => ({
  description,
  content: { 'application/json': { schema } },
})

const problemResponse = (description: string) => ({
  description,
  content: { 'application/problem+json': { schema: ref('Problem') } },
})

const serverError = problemResponse('予期しないエラー')

/** 公開 API の OpenAPI 定義。`/api/v1/openapi.json` で配信する */
export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: `${SITE_NAME} API`,
    version: '1.0.0',
    description: [
      `${SITE_NAME} (trpfrog.net) のブログ記事を読むための、認証不要・読み取り専用の API です。`,
      '',
      '## バージョニング',
      '互換性のない変更はパスのメジャーバージョン (`/api/v1`, `/api/v2`, ...) を上げて行います。',
      '古いバージョンを廃止するときは、90 日以上前から `Deprecation` と `Sunset` ヘッダーで告知します。',
      '',
      '## エラー',
      'エラーは RFC 9457 の `application/problem+json` で返し、`code` に機械可読なエラーコードを入れます。',
    ].join('\n'),
    contact: { name: 'つまみ', email: 'contact@trpfrog.net', url: PRODUCTION_ORIGIN },
  },
  servers: [{ url: `${PRODUCTION_ORIGIN}/api/v1` }],
  externalDocs: { description: 'API と MCP のドキュメント', url: `${PRODUCTION_ORIGIN}/docs/api` },
  paths: {
    '/health': {
      get: {
        operationId: 'getHealth',
        summary: 'API の稼働状況を返す',
        description: 'API が応答できるかを確認します。',
        responses: { '200': json('稼働中', ref('Health')), '500': serverError },
      },
    },
    '/blog/posts': {
      get: {
        operationId: 'searchBlogPosts',
        summary: 'ブログ記事を新しい順に一覧・検索する',
        description:
          'キーワードやタグで記事を絞り込みます。何も指定しなければすべての記事を新しい順に返します。',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'タイトル・説明・タグに含まれるキーワード (空白区切りで AND 検索)',
            schema: { type: 'string' },
          },
          {
            name: 'tag',
            in: 'query',
            description: 'このタグを持つ記事に絞り込む',
            schema: { type: 'string' },
          },
          {
            name: 'limit',
            in: 'query',
            description: '返す件数の上限',
            schema: { type: 'integer', minimum: 1, maximum: 1000 },
          },
        ],
        responses: {
          '200': json('記事の概要の配列', { type: 'array', items: ref('PostSummary') }),
          '400': problemResponse('クエリパラメータが不正'),
          '500': serverError,
        },
      },
    },
    '/blog/posts/{slug}': {
      get: {
        operationId: 'getBlogPost',
        summary: 'ブログ記事を Markdown 本文つきで取得する',
        description: 'slug で指定した記事のメタデータと、全ページ分の Markdown 本文を返します。',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description: '記事の slug (URL の /blog/<slug>)',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': json('記事', ref('Post')),
          '404': problemResponse('記事が存在しない'),
          '500': serverError,
        },
      },
    },
    '/blog/tags': {
      get: {
        operationId: 'listBlogTags',
        summary: 'ブログのタグを記事数の多い順に一覧する',
        description: 'searchBlogPosts の tag に渡せるタグと、その記事数を返します。',
        responses: {
          '200': json('タグと記事数', { type: 'array', items: ref('Tag') }),
          '500': serverError,
        },
      },
    },
  },
  components: {
    schemas: {
      Health: {
        type: 'object',
        description: 'API の稼働状況',
        required: ['status'],
        properties: { status: { type: 'string', const: 'ok', description: '稼働中なら ok' } },
      },
      PostSummary: {
        type: 'object',
        description: 'ブログ記事の概要',
        required: ['slug', 'title', 'date', 'tags', 'url', 'markdownUrl'],
        properties: {
          slug: { type: 'string', description: '記事の識別子' },
          title: { type: 'string', description: 'タイトル' },
          description: { type: 'string', description: '記事の説明' },
          date: { type: 'string', format: 'date', description: '公開日' },
          updated: { type: 'string', format: 'date', description: '更新日' },
          tags: { type: 'array', items: { type: 'string' }, description: 'タグ' },
          url: { type: 'string', format: 'uri', description: 'HTML 版の URL' },
          markdownUrl: { type: 'string', format: 'uri', description: 'Markdown 版の URL' },
        },
      },
      Post: {
        description: 'Markdown 本文つきのブログ記事',
        allOf: [
          ref('PostSummary'),
          {
            type: 'object',
            required: ['markdown'],
            properties: {
              markdown: { type: 'string', description: 'front matter つきの Markdown 本文' },
            },
          },
        ],
      },
      Tag: {
        type: 'object',
        description: 'タグとその記事数',
        required: ['name', 'count'],
        properties: {
          name: { type: 'string', description: 'タグ名' },
          count: { type: 'integer', description: 'このタグを持つ記事の数' },
        },
      },
      Problem: {
        type: 'object',
        description: 'RFC 9457 Problem Details',
        required: ['type', 'title', 'status', 'detail', 'code'],
        properties: {
          type: { type: 'string', format: 'uri', description: 'エラーの説明ページ' },
          title: { type: 'string', description: 'エラーの要約' },
          status: { type: 'integer', description: 'HTTP ステータスコード' },
          detail: { type: 'string', description: 'このリクエストで起きたことの説明' },
          code: { type: 'string', description: '機械可読なエラーコード' },
          resolution: { type: 'string', description: '解決のヒント' },
        },
      },
    },
  },
} as const
