'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'

import { env } from '@/env/server'

export type FetchImageRecordsQuery = {
  limit: number
  offset: number
}

/**
 * Cloudflare R2 のリンクは現状 production のものしか使えないことと
 * 画像の読み取りをやるだけなので production のものを使うことにする
 */
const prodImageGenClient = createTrpFrogImageGenerationClient('production')

export async function fetchImageRecords(query: FetchImageRecordsQuery) {
  return prodImageGenClient.query
    .$get({
      query: {
        limit: query.limit.toString(),
        offset: query.offset.toString(),
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
}
