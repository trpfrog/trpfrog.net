import { addHours, isSameDay } from 'date-fns'
import hash from 'stable-hash'

import {
  MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS,
  MINIMUM_UPDATE_INTERVAL_IF_UPDATING,
} from '../domain/entities/stale'
import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageUpdateStatusRepo } from '../domain/repos/image-update-status-repo'
import { getRefreshedImageUpdateStatus } from '../domain/services/getRefreshedImageUpdateStatus'

function wasGeneratedToday(lastGenerated: Date, now: Date = new Date()): boolean {
  // JST has a fixed UTC+9 offset, so shifting both dates allows a stable calendar-day comparison.
  return isSameDay(addHours(lastGenerated, 9), addHours(now, 9))
}

type UpdateImageResult =
  | {
      shouldUpdate: true
    }
  | {
      shouldUpdate: false
      message: string
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
    const shouldSkipBecauseAlreadyGeneratedToday = metadata
      ? wasGeneratedToday(metadata.createdAt)
      : false

    if (shouldSkipBecauseAlreadyGeneratedToday) {
      return {
        shouldUpdate: false,
        message: 'Image was already generated today.',
      }
    } else {
      return {
        shouldUpdate: true,
      }
    }
  }
}
