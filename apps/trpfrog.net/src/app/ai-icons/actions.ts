'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { validate } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { env } from '@/env/server'

const fetchImageRecordsQuerySchema = v.object({
  page: v.pipe(v.number(), v.integer(), v.minValue(1)),
  iconsPerPage: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(20)), 20),
})

export type FetchImageRecordsQuery = v.InferInput<typeof fetchImageRecordsQuerySchema>

/**
 * Cloudflare R2 のリンクは現状 production のものしか使えないことと
 * 画像の読み取りをやるだけなので production のものを使うことにする
 */
const prodImageGenClient = createTrpFrogImageGenerationClient('production')

export async function fetchImageRecords(rawQuery: FetchImageRecordsQuery) {
  const query = validate(fetchImageRecordsQuerySchema, rawQuery)
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
