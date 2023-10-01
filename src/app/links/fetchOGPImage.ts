import { JSDOM } from 'jsdom'
import { LRUCache } from 'lru-cache'
import sharp from 'sharp'

const cache = new LRUCache({
  max: 100,
})

export async function fetchOGPImageBase64(url: string) {
  const ogpUrl = await fetch(url)
    .then(res => res.text())
    .then(text => {
      const el = new JSDOM(text)
      const headEls = el.window.document.querySelectorAll('head > meta')
      const ogImage = Array.from(headEls)
        .find(v => {
          const prop = v.getAttribute('property')
          if (!prop) return false
          return prop === 'og:image'
        })
        ?.getAttribute('content')
      return ogImage
    })
  if (!ogpUrl) return null
  const res = await fetch(ogpUrl)
  const blob = await res.blob()

  // resize to 1200 x 630 px using sharp
  const buffer = Buffer.from(await blob.arrayBuffer())
  const resizedBuffer = await sharp(buffer).resize(120, 63).toBuffer()
  return resizedBuffer.toString('base64')
}
