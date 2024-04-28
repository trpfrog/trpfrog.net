import { useCallback, useMemo } from 'react'

import useSWR from 'swr'
import { match } from 'ts-pattern'

import {
  TrpFrogImageGenerationResult,
  TrpFrogImageGenerationResultSchema,
} from '@/app/api/[[...route]]/_routes/trpfrog-diffusion/schema'

export type TrpFrogDiffusionResult =
  | {
      status: 'loading' | 'error'
      data: undefined
    }
  | {
      status: 'ok'
      data: TrpFrogImageGenerationResult
    }

export function useTrpFrogDiffusion(): TrpFrogDiffusionResult {
  const fetcher = useCallback(
    (url: string) =>
      fetch(url)
        .then(r => r.json())
        .then(data => TrpFrogImageGenerationResultSchema.parse(data)),
    [],
  )
  const swrResult = useSWR('/api/trpfrog-diffusion', fetcher)

  const status: TrpFrogDiffusionResult['status'] = match(swrResult)
    .with({ isLoading: true }, () => 'loading' as const)
    .with({ data: undefined }, () => 'error' as const)
    .otherwise(() => 'ok' as const)

  return useMemo(() => {
    if (status === 'ok') {
      return { data: swrResult.data!, status }
    } else {
      return { data: undefined, status }
    }
  }, [status, swrResult])
}
