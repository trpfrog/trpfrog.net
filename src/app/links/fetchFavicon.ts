import { LRUCache } from 'lru-cache'

const faviconCache = new LRUCache<string, string>({
  max: 1000,
})

export async function fetchFaviconBase64(url: string) {
  if (faviconCache.has(url)) {
    return faviconCache.get(url)
  }
  const endpoint = 'http://www.google.com/s2/favicons?domain=' + url
  const res = await fetch(endpoint)
  const blob = await res.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  faviconCache.set(url, base64)
  return base64
}
