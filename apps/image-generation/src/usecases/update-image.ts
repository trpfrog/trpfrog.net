import { GeneratedImage, ImagePrompt } from '../domain/entities/generation-result'
import { IMAGE_STALE_MINUTES } from '../domain/entities/stale'
import { GeneratedImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { isStale } from '../lib/stale'

import { uploadNewImageUsecase } from './upload-new-image'

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
  imageMetadataRepo: GeneratedImageMetadataRepo
  uploadImage: ReturnType<typeof uploadNewImageUsecase>
  imageGenerator: () => Promise<{
    image: GeneratedImage
    prompt: ImagePrompt
  }>
}) {
  return async (options?: { forceUpdate?: boolean }): Promise<UpdateImageResult> => {
    const metadata = await deps.imageMetadataRepo.getLatest()
    const { shouldCache, waitMinutes } =
      options?.forceUpdate || !metadata // if no metadata, force update
        ? {
            shouldCache: false,
            waitMinutes: 0,
          }
        : isStale(IMAGE_STALE_MINUTES, metadata.createdAt)

    if (shouldCache) {
      return {
        updated: false,
        message: `Minimum update interval is 180 minutes, please wait ${waitMinutes} minutes.`,
        waitMinutes,
      }
    }

    const result = await deps.imageGenerator()
    await deps.uploadImage(result.image.image, {
      modelName: result.image.modelName,
      imageExtension: result.image.extension,
      prompt: result.prompt,
    })
    return {
      updated: true,
    }
  }
}
