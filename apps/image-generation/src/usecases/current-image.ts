import { ImageGenerationResult } from '@/domain/entities/generation-result'
import { AITrpFrogImageRepo } from '@/domain/repos/image-repo'

export function usecase_currentImage(deps: { imageRepo: AITrpFrogImageRepo }) {
  return deps.imageRepo.read.currentImage
}

export function usecase_currentMetadata(deps: { imageRepo: AITrpFrogImageRepo }) {
  return deps.imageRepo.read.currentMetadata
}

export function usecase_updateImage(deps: { imageRepo: AITrpFrogImageRepo }) {
  return (result: ImageGenerationResult) => deps.imageRepo.update(result)
}
