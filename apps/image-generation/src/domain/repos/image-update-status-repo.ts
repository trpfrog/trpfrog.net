import { ImageUpdateStatus } from '../entities/image-update-status'

export interface ImageUpdateStatusRepo {
  get: () => Promise<ImageUpdateStatus>
  set: (status: ImageUpdateStatus) => Promise<void>
}
