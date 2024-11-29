import { ImageGenerationResult } from '@/domain/entities/generation-result'
import { AITrpFrogImageRepo } from '@/domain/repos/image-repo'

export function currentImageUsecase(deps: { imageRepo: AITrpFrogImageRepo }) {
  return deps.imageRepo.read.currentImage
}

export function currentMetadataUsecase(deps: { imageRepo: AITrpFrogImageRepo }) {
  return deps.imageRepo.read.currentMetadata
}

export function updateImageUsecase(deps: { imageRepo: AITrpFrogImageRepo }) {
  return (result: ImageGenerationResult) => deps.imageRepo.update(result)
}
