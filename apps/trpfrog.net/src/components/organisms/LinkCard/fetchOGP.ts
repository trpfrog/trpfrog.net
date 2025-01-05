import 'server-only'
import { cacheTags } from '@trpfrog.net/constants'

import type { OgObject } from 'open-graph-scraper-lite/dist/lib/types'

export async function fetchOGP(url: string): Promise<OgObject> {
  const { default: ogs } = await import('open-graph-scraper-lite')
  const html = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 24 * 7,
      tags: [cacheTags.allOgp.tag, cacheTags.ogp.tag(url)],
    },
  }).then(res => res.text())
  const { result } = await ogs({
    html,
    customMetaTags: [{ property: 'theme-color', multiple: false, fieldName: 'themeColor' }],
  })
  return result
}
