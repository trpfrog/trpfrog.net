import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageStoreRepo } from '../domain/repos/image-store-repo'

export function currentImageUseCase(deps: {
  imageMetadataRepo: ImageMetadataRepo
  imageStoreRepo: ImageStoreRepo
}) {
  return async () => {
    const metadata = await deps.imageMetadataRepo.getLatest()
    const filename = metadata?.imageUri.split('/').pop()
    if (!filename) {
      return null
    }
    return await deps.imageStoreRepo.download(filename)
  }
}

export function currentMetadataUseCase(deps: { imageMetadataRepo: ImageMetadataRepo }) {
  return async () => {
    return await deps.imageMetadataRepo.getLatest()
  }
}
