import { z } from 'zod'

import { createURL } from '@/lib/url'

import { env } from '@/env/server'

const FontInfoSchema = z.object({
  items: z
    .object({
      family: z.string(),
      files: z.record(z.string(), z.string().url()),
    })
    .array(),
})

export async function fetchFont(
  familyName: string,
  weight: string | number,
): Promise<ArrayBuffer> {
  if (!env.GOOGLE_FONTS_API_KEY) {
    throw new Error('GOOGLE_FONTS_API_KEY is not set')
  }

  if (typeof weight === 'number') {
    weight = weight.toString()
  }

  const endpoint = createURL(
    '/webfonts/v1/webfonts',
    'https://www.googleapis.com',
    {
      family: familyName,
      key: env.GOOGLE_FONTS_API_KEY,
    },
  )

  const rawGoogleFontsInfo = await fetch(endpoint).then(res => res.json())

  const googleFontsInfo = await FontInfoSchema.parseAsync(
    rawGoogleFontsInfo,
  ).catch(e => {
    console.error(`Endpoint: ${endpoint}`)
    console.error(`Response: ${JSON.stringify(rawGoogleFontsInfo, null, 2)}`)
    console.error(e)
    throw e
  })
  const url = googleFontsInfo.items[0].files[weight]

  return fetch(url, {
    cache: 'no-cache',
  }).then(res => res.arrayBuffer())
}
