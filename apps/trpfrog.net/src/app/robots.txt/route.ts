import { PRODUCTION_ORIGIN } from '@/lib/constants'

// Next.js の robots.ts は Content-Signal を書けないので、Route Handler で直接返す。
// Cloudflare の managed robots.txt はこの内容の前にコメントを付け足す。
const ROBOTS_TXT = `User-agent: *
Content-Signal: search=yes, ai-input=yes
Allow: /
Disallow: /blog/preview/

Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml
`

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
