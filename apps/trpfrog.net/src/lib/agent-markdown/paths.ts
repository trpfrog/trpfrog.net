/** `/blog/<slug>` または `/blog/<slug>/<page>` を分解する */
export function parseBlogPath(path: string): { slug: string; page?: string } | null {
  const match = /^\/blog\/([^/]+)(?:\/([^/]+))?$/.exec(path)
  if (!match?.[1] || match[1] === 'tags' || match[1] === 'preview') return null
  return { slug: decodeURIComponent(match[1]), page: match[2] }
}
