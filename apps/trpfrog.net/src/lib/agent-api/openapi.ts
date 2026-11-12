import { PRODUCTION_ORIGIN, SITE_NAME } from '@/lib/constants'

const postSummarySchema = {
  type: 'object',
  required: ['slug', 'title', 'date', 'tags', 'url', 'markdownUrl'],
  properties: {
    slug: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    date: { type: 'string', format: 'date' },
    updated: { type: 'string', format: 'date' },
    tags: { type: 'array', items: { type: 'string' } },
    url: { type: 'string', format: 'uri', description: 'HTML 版の URL' },
    markdownUrl: { type: 'string', format: 'uri', description: 'Markdown 版の URL' },
  },
} as const

const errorSchema = {
  type: 'object',
  required: ['error'],
  properties: { error: { type: 'string' } },
} as const

/** 公開 API の OpenAPI 定義。`/api/openapi.json` で配信する */
export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: `${SITE_NAME} Public API`,
    version: '1.0.0',
    description: `${SITE_NAME} (trpfrog.net) のブログ記事を読むための、認証不要・読み取り専用の API です。`,
  },
  servers: [{ url: `${PRODUCTION_ORIGIN}/api` }],
  externalDocs: { url: `${PRODUCTION_ORIGIN}/llms.txt` },
  paths: {
    '/health': {
      get: {
        operationId: 'getHealth',
        summary: 'API の稼働状況',
        responses: {
          '200': {
            description: '稼働中',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', const: 'ok' } },
                },
              },
            },
          },
        },
      },
    },
    '/blog/posts': {
      get: {
        operationId: 'searchBlogPosts',
        summary: 'ブログ記事を新しい順に一覧・検索する',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'タイトル・説明・タグに含まれるキーワード (空白区切りで AND 検索)',
            schema: { type: 'string' },
          },
          { name: 'tag', in: 'query', description: 'タグで絞り込む', schema: { type: 'string' } },
          {
            name: 'limit',
            in: 'query',
            description: '返す件数の上限',
            schema: { type: 'integer', minimum: 1, maximum: 1000 },
          },
        ],
        responses: {
          '200': {
            description: '記事の概要の配列',
            content: {
              'application/json': { schema: { type: 'array', items: postSummarySchema } },
            },
          },
        },
      },
    },
    '/blog/posts/{slug}': {
      get: {
        operationId: 'getBlogPost',
        summary: 'ブログ記事を Markdown 本文つきで取得する',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: '記事',
            content: {
              'application/json': {
                schema: {
                  ...postSummarySchema,
                  required: [...postSummarySchema.required, 'markdown'],
                  properties: { ...postSummarySchema.properties, markdown: { type: 'string' } },
                },
              },
            },
          },
          '404': {
            description: '記事が存在しない',
            content: { 'application/json': { schema: errorSchema } },
          },
        },
      },
    },
    '/blog/tags': {
      get: {
        operationId: 'listBlogTags',
        summary: 'ブログのタグを記事数の多い順に一覧する',
        responses: {
          '200': {
            description: 'タグと記事数',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['name', 'count'],
                    properties: { name: { type: 'string' }, count: { type: 'integer' } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const
