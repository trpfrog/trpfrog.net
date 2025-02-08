import { useCallback } from 'react'

import { vCoerceNumber } from '@trpfrog.net/utils/valibot'
import { useSearchParams } from 'next/navigation'
import useSWRImmutable from 'swr/immutable'
import * as v from 'valibot'

import { fetchImageRecords, FetchImageRecordsQuery } from './actions'

export function useImageRecords(query: FetchImageRecordsQuery) {
  const fetcher = useCallback(() => fetchImageRecords(query), [query])
  const key = `useImageRecords-${JSON.stringify(query)}`
  const res = useSWRImmutable(key, fetcher, {
    keepPreviousData: true,
  })
  return res
}

const pageNumberSchema = v.pipe(vCoerceNumber, v.integer(), v.minValue(1))

export function usePageNumber() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const res = v.safeParse(pageNumberSchema, page)
  return res.success ? res.output : 1
}
