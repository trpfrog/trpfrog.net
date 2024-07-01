'use server'

import { LRUCache } from 'lru-cache'
import ogs from 'open-graph-scraper-lite'
import { OgObject } from 'open-graph-scraper-lite/dist/lib/types'

const cache = new LRUCache<string, OgObject>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
})

export async function fetchOGP(url: string): Promise<OgObject> {
  const cached = cache.get(url)
  if (cached) {
    return cached
  }
  const html = await fetch(url).then(res => res.text())
  const { result } = await ogs({
    html,
    customMetaTags: [{ property: 'theme-color', multiple: false, fieldName: 'themeColor' }],
  })
  cache.set(url, result)
  return result
}
