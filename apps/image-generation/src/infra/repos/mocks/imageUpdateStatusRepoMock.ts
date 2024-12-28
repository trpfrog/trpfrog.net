import { ImageUpdateStatus } from '../../../domain/entities/image-update-status'
import { ImageUpdateStatusRepo } from '../../../domain/repos/image-update-status-repo'

export function createImageUpdateStatusRepoMock(
  initialStatus?: ImageUpdateStatus,
): ImageUpdateStatusRepo {
  let status: ImageUpdateStatus = initialStatus ?? { status: 'idle' }
  return {
    get: async () => {
      return status
    },
    set: async (newStatus: ImageUpdateStatus) => {
      status = newStatus
    },
  }
}
