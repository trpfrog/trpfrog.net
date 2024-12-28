import { useCallback } from 'react'

import { useSearchParams } from 'next/navigation'
import useSWRImmutable from 'swr/immutable'
import { z } from 'zod'

import { fetchImageRecords, FetchImageRecordsQuery } from './actions'

export function useImageRecords(query: FetchImageRecordsQuery) {
  const fetcher = useCallback(() => fetchImageRecords(query), [query])
  const key = `useImageRecords-${JSON.stringify(query)}`
  const res = useSWRImmutable(key, fetcher, {
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
