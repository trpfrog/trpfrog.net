type MediaRange = { type: string; q: number }

function parseAccept(accept: string): MediaRange[] {
  return accept
    .split(',')
    .map(part => {
      const [type = '', ...params] = part.split(';').map(s => s.trim())
      const qParam = params.find(p => p.toLowerCase().startsWith('q='))
      const q = qParam ? Number(qParam.slice(2)) : 1
      return { type: type.toLowerCase(), q: Number.isNaN(q) ? 0 : q }
    })
    .filter(range => range.type !== '')
}

function qualityOf(ranges: MediaRange[], candidates: string[]): number {
  for (const candidate of candidates) {
    const range = ranges.find(r => r.type === candidate)
    if (range) return range.q
  }
  return 0
}

/**
 * Accept ヘッダーが HTML より Markdown を好んでいるかを判定する。
 * `*\/*` だけでは Markdown を望んでいるとはみなさない。
 */
export function prefersMarkdown(accept: string | undefined): boolean {
  if (!accept) return false
  const ranges = parseAccept(accept)
  const markdown = qualityOf(ranges, ['text/markdown'])
  if (markdown <= 0) return false
  const html = qualityOf(ranges, ['text/html', 'text/*', '*/*'])
  return markdown >= html
}
