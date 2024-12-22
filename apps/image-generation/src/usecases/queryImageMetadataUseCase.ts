import { ImageMetadata } from '../domain/entities/generation-result'
import { ImageMetadataQuery, ImageMetadataRepo } from '../domain/repos/image-metadata-repo'

export function queryImageMetadataUseCase(deps: { imageMetadataRepo: ImageMetadataRepo }) {
  return async (
    query: ImageMetadataQuery,
  ): Promise<{
    result: ImageMetadata[]
    count: number
  }> => {
    const [result, count] = await Promise.all([
      deps.imageMetadataRepo.query(query),
      deps.imageMetadataRepo.count(query.where),
    ])
    return { result, count }
  }
}
