import hash from 'stable-hash'

import {
  IMAGE_STALE_MINUTES,
  MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS,
  MINIMUM_UPDATE_INTERVAL_IF_UPDATING,
} from '../domain/entities/stale'
import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageUpdateStatusRepo } from '../domain/repos/image-update-status-repo'
import { getRefreshedImageUpdateStatus } from '../domain/services/getRefreshedImageUpdateStatus'
import { isStale } from '../lib/stale'

type UpdateImageResult =
  | {
      shouldUpdate: true
    }
  | {
      shouldUpdate: false
      message: string
      waitMinutes: number
    }

export function shouldUpdateUseCase(deps: {
  imageMetadataRepo: ImageMetadataRepo
  imageUpdateStatusRepo: ImageUpdateStatusRepo
}) {
  return async (options?: { forceUpdate?: boolean }): Promise<UpdateImageResult> => {
    if (options?.forceUpdate) {
      return {
        shouldUpdate: true,
      }
    }

    const oldStatus = await deps.imageUpdateStatusRepo.get()
    const status = getRefreshedImageUpdateStatus(oldStatus)

    if (hash(oldStatus) !== hash(status)) {
      await deps.imageUpdateStatusRepo.set(status)
      console.log('Image update status has refreshed!:', oldStatus, '->', status)
    }

    // 二重に更新が走らないようにする
    if (status.status === 'updating') {
      return {
        shouldUpdate: false,
        message: 'Image is currently updating, please wait.',
        waitMinutes: MINIMUM_UPDATE_INTERVAL_IF_UPDATING,
      }
    }

    // 前回エラーが発生していた場合は 30 分間隔をあける
    if (status.status === 'error') {
      return {
        shouldUpdate: false,
        message: 'Recent update failed, please wait before trying again.',
        waitMinutes: MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS,
      }
    }

    const metadata = await deps.imageMetadataRepo.getLatest()
    const { shouldCache, waitMinutes } = !metadata // if no metadata, force update
      ? {
          shouldCache: false,
          waitMinutes: 0,
        }
      : isStale(IMAGE_STALE_MINUTES, metadata.createdAt)

    if (shouldCache) {
      return {
        shouldUpdate: false,
        message: `Minimum update interval is ${IMAGE_STALE_MINUTES} minutes, please wait ${waitMinutes} minutes.`,
        waitMinutes,
      }
    } else {
      return {
        shouldUpdate: true,
      }
    }
  }
}
