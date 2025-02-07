import { parse } from 'node-html-parser'

export function parsePageInfo(rawHtml: string) {
  const parsed = parse(rawHtml)
  const title =
    parsed.querySelector('meta[property="og:title"]')?.getAttribute('content') ??
    parsed.querySelector('title')?.textContent ??
    parsed.querySelector('h1')?.textContent ??
    'No title'

  const description =
    parsed.querySelector('meta[property="og:description"]')?.getAttribute('content') ??
    parsed.querySelector('meta[name="description"]')?.getAttribute('content') ??
    undefined

  const imageUrl =
    parsed.querySelector('meta[property="og:image"]')?.getAttribute('content') ??
    parsed.querySelector('meta[property="og:image:url"]')?.getAttribute('content') ??
    parsed.querySelector('meta[property="og:image:secure_url"]')?.getAttribute('content') ??
    undefined

  const favicon = parsed.querySelector('link[rel="icon"]')?.getAttribute('href') ?? undefined
  const themeColor =
    parsed.querySelector('meta[name="theme-color"]')?.getAttribute('content') ?? undefined

  return { title, description, imageUrl, favicon, themeColor }
}

export async function parsePageInfoFromUrl(url: string) {
  const response = await fetch(url)
  const rawHtml = await response.text()
  return parsePageInfo(rawHtml)
}
