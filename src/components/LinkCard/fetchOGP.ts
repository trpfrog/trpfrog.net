'use server'

import { LRUCache } from 'lru-cache'
import ogs from 'open-graph-scraper'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

const cache = new LRUCache<string, OgObject>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
})

export async function fetchOGP(url: string) {
  if (cache.has(url)) {
    return cache.get(url)
  }
  const { result } = await ogs({ url })
  cache.set(url, result)
  return result
}
