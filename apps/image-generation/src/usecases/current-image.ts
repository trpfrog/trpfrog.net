import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageStoreRepo } from '../domain/repos/image-store-repo'

export function currentImageUsecase(deps: {
  imageMetadataRepo: ImageMetadataRepo
  imageStoreRepo: ImageStoreRepo
}) {
  return async () => {
    const metadata = await deps.imageMetadataRepo.getLatest()
    if (!metadata) {
      return null
    }
    return await deps.imageStoreRepo.download(metadata.imageUri)
  }
}

export function currentMetadataUsecase(deps: { imageMetadataRepo: ImageMetadataRepo }) {
  return async () => {
    return await deps.imageMetadataRepo.getLatest()
  }
}
