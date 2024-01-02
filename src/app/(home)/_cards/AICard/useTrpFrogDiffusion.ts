import { useCallback, useMemo } from 'react'

import useSWR from 'swr'

import type { TrpFrogImageGenerationResult } from '@/app/api/trpfrog-diffusion/route'

export type TrpFrogDiffusionResult =
  | {
      data: undefined
      status: 'loading' | 'error'
    }
  | {
      data: TrpFrogImageGenerationResult
      status: 'ok'
    }

export function useTrpFrogDiffusion() {
  const fetcher = useCallback(
    (url: string) => fetch(url).then(r => r.json()),
    [],
  )
  const { data, error, isLoading } = useSWR('/api/trpfrog-diffusion', fetcher)

  let status: TrpFrogDiffusionResult['status']
  if (isLoading) {
    status = 'loading'
  } else if (error || !data || !data.base64) {
    status = 'error'
  } else {
    status = 'ok'
  }

  return useMemo(
    () => ({
      status,
      data,
    }),
    [status, data],
  )
}
