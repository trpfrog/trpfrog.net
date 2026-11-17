import type { BlogPost } from '@trpfrog.net/posts'

import { NAVIGATION_LINKS } from '@/components/organisms/Navigation/navigation-links'
import { SITE_PROFILE } from '@/lib/site-profile'

type PostSummary = Pick<BlogPost, 'slug' | 'title' | 'date' | 'description'>

const RECENT_POST_COUNT = 10

function postListItem(post: PostSummary): string {
  const description = post.description ? ` — ${post.description}` : ''
  return `- [${post.title}](/blog/${encodeURIComponent(post.slug)}.md) (${post.date})${description}`
}

/** トップページと /llms.txt で返す、サイト全体の案内 */
export function buildHomeMarkdown(posts: PostSummary[]): string {
  const { author } = SITE_PROFILE
  return [
    `# ${SITE_PROFILE.name}`,
    '',
    `> ${SITE_PROFILE.description}`,
    '',
    `${author.name} (${author.alternateName.join(' / ')}) の個人サイトです。${author.description}`,
    '',
    '## Contact',
    '',
    ...author.sameAs.map(url => `- ${url}`),
    `- mailto:${author.email}`,
    '',
    '## For agents',
    '',
    'つまみ (trpfrog) やこのサイトのブログ記事について調べるときに使ってください。',
    '',
    '- どのページも `Accept: text/markdown` で Markdown を返します',
    '- 公開 API: [/docs/api](/docs/api) (OpenAPI: [/api/v1/openapi.json](/api/v1/openapi.json))',
    '- MCP サーバー: `https://trpfrog.net/mcp` (Streamable HTTP, 認証不要)',
    '',
    '## Pages',
    '',
    ...NAVIGATION_LINKS.map(({ link, name }) => `- [${name}](${link})`),
    '',
    '## Recent blog posts',
    '',
    ...posts.slice(0, RECENT_POST_COUNT).map(postListItem),
    '',
    '記事の一覧は [/blog](/blog) を `Accept: text/markdown` で取得してください。',
    'ページの一覧は [/sitemap.xml](/sitemap.xml) にあります。',
    '',
  ].join('\n')
}

export function buildBlogIndexMarkdown(posts: PostSummary[]): string {
  return [
    `# Blog - ${SITE_PROFILE.name}`,
    '',
    '各記事は `/blog/<slug>.md` で Markdown として取得できます。',
    '',
    ...posts.map(postListItem),
    '',
  ].join('\n')
}

export function buildNotFoundMarkdown(path: string): string {
  return [
    '# 404 Not Found',
    '',
    `\`${path}\` は存在しません。サイトの工事中か、リンクが誤っている可能性があります。`,
    '',
    '- [Home](/)',
    '- [Blog](/blog)',
    '- [Sitemap](/sitemap.xml)',
    '',
  ].join('\n')
}

export function buildNoMarkdownVersionMarkdown(url: string): string {
  return [
    `# ${SITE_PROFILE.name}`,
    '',
    `このページ (${url}) はインタラクティブなページのため、Markdown 版はありません。HTML 版を参照してください。`,
    '',
    '- [Home](/)',
    '- [Blog](/blog)',
    '- [Sitemap](/sitemap.xml)',
    '',
  ].join('\n')
}
