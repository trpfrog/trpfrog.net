import { differenceInMinutes } from 'date-fns'

import { GeneratedImage, ImagePrompt } from '../domain/entities/generation-result'
import {
  IMAGE_STALE_MINUTES,
  MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS,
} from '../domain/entities/stale'
import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageUpdateStatusRepo } from '../domain/repos/image-update-status-repo'
import { isStale } from '../lib/stale'

import { uploadNewImageUseCase } from './uploadNewImageUseCase'

type UpdateImageResult =
  | {
      updated: true
    }
  | {
      updated: false
      message: string
      waitMinutes: number
    }

export function refreshImageIfStaleUseCase(deps: {
  imageMetadataRepo: ImageMetadataRepo
  imageUpdateStatusRepo: ImageUpdateStatusRepo
  uploadImage: ReturnType<typeof uploadNewImageUseCase>
  imageGenerator: () => Promise<{
    image: GeneratedImage
    prompt: ImagePrompt
  }>
}) {
  return async (options?: { forceUpdate?: boolean }): Promise<UpdateImageResult> => {
    const status = await deps.imageUpdateStatusRepo.get()

    // 二重に更新が走らないようにする
    if (status.status === 'updating') {
      return {
        updated: false,
        message: 'Image is currently updating, please wait.',
        waitMinutes: 0,
      }
    }

    // 前回エラーが発生していた場合は 30 分間隔をあける
    if (status.status === 'error' && !options?.forceUpdate) {
      const diff = differenceInMinutes(new Date(), status.occurredAt)
      const waitMinutes = MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS - diff
      if (waitMinutes > 0) {
        return {
          updated: false,
          message: 'Recent update failed, please wait before trying again.',
          waitMinutes,
        }
      }
    }

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
        message: `Minimum update interval is ${IMAGE_STALE_MINUTES} minutes, please wait ${waitMinutes} minutes.`,
        waitMinutes,
      }
    }

    try {
      // 更新中ステータスをセット
      await deps.imageUpdateStatusRepo.set({
        status: 'updating',
        startedAt: new Date(),
      })

      const result = await deps.imageGenerator()
      await deps.uploadImage(result.image.image, {
        modelName: result.image.modelName,
        imageExtension: result.image.extension,
        prompt: result.prompt,
      })

      console.log('Image updated successfully with new prompt:', result.prompt.text)

      // 更新完了ステータスをセット
      await deps.imageUpdateStatusRepo.set({
        status: 'idle',
      })
      return {
        updated: true,
      }
    } catch (e) {
      // 更新に失敗した場合はエラーステータスをセット
      console.error(e)
      await deps.imageUpdateStatusRepo.set({
        status: 'error',
        occurredAt: new Date(),
      })

      return {
        updated: false,
        message: 'Failed to update image, please try again later.',
        waitMinutes: 0,
      }
    }
  }
}
