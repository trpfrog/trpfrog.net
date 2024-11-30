import { RandomImageGenerationResult } from '../domain/entities/generation-result'
import { IMAGE_STALE_MINUTES } from '../domain/entities/stale'
import { AITrpFrogImageRepo } from '../domain/repos/image-repo'
import { isStale } from '../lib/stale'

type UpdateImageResult =
  | {
      updated: true
    }
  | {
      updated: false
      message: string
      waitMinutes: number
    }

export function refreshImageIfStaleUsecase(deps: {
  imageRepo: AITrpFrogImageRepo
  imageGenerator: () => Promise<RandomImageGenerationResult>
}) {
  return async (options?: { forceUpdate?: boolean }): Promise<UpdateImageResult> => {
    const metadata = await deps.imageRepo.read.currentMetadata()
    const { shouldCache, waitMinutes } = options?.forceUpdate
      ? {
          shouldCache: false,
          waitMinutes: 0,
        }
      : isStale(IMAGE_STALE_MINUTES, metadata.generatedTime)

    if (shouldCache) {
      return {
        updated: false,
        message: `Minimum update interval is 180 minutes, please wait ${waitMinutes} minutes.`,
        waitMinutes,
      }
    }
    const result = await deps.imageGenerator()
    await deps.imageRepo.update(result)
    return {
      updated: true,
    }
  }
}
