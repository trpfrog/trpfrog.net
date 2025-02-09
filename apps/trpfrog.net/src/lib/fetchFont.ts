import { createURL, safeValidateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { env } from '@/env/server'

const FontInfoSchema = v.object({
  items: v.array(
    v.object({
      family: v.string(),
      files: v.record(v.string(), v.pipe(v.string(), v.url())),
    }),
  ),
})

export async function fetchFont(familyName: string, weight: string | number): Promise<ArrayBuffer> {
  if (!env.GOOGLE_FONTS_API_KEY) {
    throw new Error('GOOGLE_FONTS_API_KEY is not set')
  }

  if (typeof weight === 'number') {
    weight = weight.toString()
  }

  const endpoint = createURL('/webfonts/v1/webfonts', 'https://www.googleapis.com', {
    family: familyName,
    key: env.GOOGLE_FONTS_API_KEY,
  })

  const rawGoogleFontsInfo = await fetch(endpoint).then(res => res.json())

  const googleFontsInfoResult = safeValidateUnknown(FontInfoSchema, rawGoogleFontsInfo)
  if (!googleFontsInfoResult.success) {
    console.error(`Endpoint: ${endpoint}`)
    console.error(`Response: ${JSON.stringify(rawGoogleFontsInfo, null, 2)}`)
    console.error(googleFontsInfoResult.issues)
    throw new Error('Failed to validate Google Fonts API response')
  }
  const googleFontsInfo = googleFontsInfoResult.output
  const url = googleFontsInfo.items[0].files[weight]

  return fetch(url, {
    cache: 'no-cache',
  }).then(res => res.arrayBuffer())
}
