'use server'

import { LRUCache } from 'lru-cache'
import ogs from 'open-graph-scraper'
import { OgObject } from 'open-graph-scraper/dist/lib/types'
import sharp from 'sharp'

const cache = new LRUCache<string, OgObject>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
})

/**
 * fetch image url and resize it
 * @param url
 * @returns base64 encoded image
 */
async function resizeOgpImage(url: string): Promise<string> {
  const image = await fetch(url)
  const blob = await image.blob()
  const buffer = await blob.arrayBuffer()
  const resized = await sharp(buffer).resize(400, 210).toBuffer()
  return `data:image/png;base64,${resized.toString('base64')}`
}

export async function fetchOGP(url: string) {
  if (cache.has(url)) {
    return cache.get(url)
  }
  const { result } = await ogs({
    url,
    customMetaTags: [
      { property: 'theme-color', multiple: false, fieldName: 'themeColor' },
      { property: 'twitter:card', multiple: false, fieldName: 'twitterCard' },
    ],
  })
  if (result.ogImage) {
    result.ogImage[0].url = await resizeOgpImage(result.ogImage[0].url)
  }
  cache.set(url, result)
  return result
}
