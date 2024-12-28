import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'

export function softDeleteUseCase(deps: { imageMetadataRepo: ImageMetadataRepo }) {
  return async (id: string) => {
    try {
      await deps.imageMetadataRepo.softDelete(id)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
