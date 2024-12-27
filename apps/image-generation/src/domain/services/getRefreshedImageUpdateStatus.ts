import { differenceInMinutes } from 'date-fns'
import { match } from 'ts-pattern'

import { ImageUpdateStatus } from '../entities/image-update-status'
import {
  MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS,
  MINIMUM_UPDATE_INTERVAL_IF_UPDATING,
} from '../entities/stale'

/**
 * Refreshes the image update status.
 * @param status
 * @returns
 */
export function getRefreshedImageUpdateStatus(
  status: ImageUpdateStatus,
  currentDate = new Date(),
): ImageUpdateStatus {
  return match(status)
    .with({ status: 'updating' }, s =>
      differenceInMinutes(currentDate, s.startedAt) > MINIMUM_UPDATE_INTERVAL_IF_UPDATING
        ? { status: 'idle' as const }
        : s,
    )
    .with({ status: 'error' }, s =>
      differenceInMinutes(currentDate, s.occurredAt) > MINIMUM_UPDATE_INTERVAL_IF_ERROR_OCCURS
        ? { status: 'idle' as const }
        : s,
    )
    .otherwise(() => status)
}
