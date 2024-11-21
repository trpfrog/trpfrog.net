import { generateNewImage } from './ai/generateNewImage'

import { Deps } from '@/domain/deps'
import { isImageStale } from '@/domain/services/stale'

type UpdateImageResult =
  | {
      updated: true
    }
  | {
      updated: false
      message: string
      waitMinutes: number
    }

export async function refreshImage(
  deps: Deps<'imageRepo' | typeof generateNewImage>,
): Promise<void> {
  const data = await generateNewImage(deps, {
    numberOfRetries: 3,
  }).catch(e => {
    console.error(e)
    throw new Error('Failed to generate image')
  })
  await deps.imageRepo.update(data)
}

export async function refreshImageIfStale(
  deps: Deps<'imageRepo' | typeof refreshImage>,
): Promise<UpdateImageResult> {
  const metadata = await deps.imageRepo.read.currentMetadata()
  const { shouldCache, waitMinutes } = isImageStale(metadata.generatedTime)
  if (shouldCache) {
    return {
      updated: false,
      message: `Minimum update interval is 180 minutes, please wait ${waitMinutes} minutes.`,
      waitMinutes,
    }
  }

  await refreshImage(deps)
  return {
    updated: true,
  }
}
