import { useCallback } from 'react'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { z } from 'zod'

/**
 * Cloudflare R2 のリンクは現状 production のものしか使えないことと
 * 画像の読み取りをやるだけなので production のものを使うことにする
 */
const prodImageGenClient = createTrpFrogImageGenerationClient('production')

export type FetchImageRecordsQuery = {
  limit: number
  offset: number
}

async function fetchImageRecords(query: FetchImageRecordsQuery) {
  return prodImageGenClient.query
    .$get({
      query: {
        limit: query.limit.toString(),
        offset: query.offset.toString(),
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

export function useImageRecords(query: FetchImageRecordsQuery) {
  const fetcher = useCallback(() => fetchImageRecords(query), [query])
  const key = `useImageRecords-${JSON.stringify(query)}`
  const res = useSWR(key, fetcher, {
    keepPreviousData: true,
  })
  return res
}

const pageNumberSchema = z.coerce.number().int().positive()
export function usePageNumber() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const res = pageNumberSchema.safeParse(page)
  return res.success ? res.data : 1
}
