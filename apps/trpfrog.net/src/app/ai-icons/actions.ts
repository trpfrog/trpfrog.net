'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { z } from 'zod'

import { env } from '@/env/server'

const fetchImageRecordsQuerySchema = z.object({
  page: z.number().int().positive(),
  iconsPerPage: z.number().int().positive().max(20).default(20),
})

export type FetchImageRecordsQuery = z.input<typeof fetchImageRecordsQuerySchema>

/**
 * Cloudflare R2 のリンクは現状 production のものしか使えないことと
 * 画像の読み取りをやるだけなので production のものを使うことにする
 */
const prodImageGenClient = createTrpFrogImageGenerationClient('production')

export async function fetchImageRecords(rawQuery: FetchImageRecordsQuery) {
  const query = fetchImageRecordsQuerySchema.parse(rawQuery)
  const { result, total } = await prodImageGenClient.query
    .$get({
      query: {
        limit: query.iconsPerPage.toString(),
        offset: ((query.page - 1) * query.iconsPerPage).toString(),
      },
      header: {
        'x-api-key': env.TRPFROG_FUNCTIONS_SECRET ?? '',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Failed to fetch images')
      }
    })

  return { result, total, numPages: Math.ceil(total / query.iconsPerPage) }
}
