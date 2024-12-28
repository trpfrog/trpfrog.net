import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'

export function undeleteUseCase(deps: { imageMetadataRepo: ImageMetadataRepo }) {
  return async (id: string) => {
    try {
      await deps.imageMetadataRepo.undelete(id)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
