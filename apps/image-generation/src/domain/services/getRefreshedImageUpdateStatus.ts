import { differenceInMinutes } from 'date-fns'
import { match } from 'ts-pattern'

import { ImageUpdateStatus } from '../entities/image-update-status'

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
      differenceInMinutes(currentDate, s.startedAt) > 10 ? { status: 'idle' as const } : s,
    )
    .with({ status: 'error' }, s =>
      differenceInMinutes(currentDate, s.occurredAt) > 60 ? { status: 'idle' as const } : s,
    )
    .otherwise(() => status)
}
