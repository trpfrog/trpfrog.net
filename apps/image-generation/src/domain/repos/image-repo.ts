import type {
  TrpFrogImageGenerationMetadata,
  ImageGenerationResult,
} from '../entities/generation-result'

export interface AITrpFrogImageRepo {
  read: {
    currentImage: () => Promise<ArrayBuffer>
    currentMetadata: () => Promise<TrpFrogImageGenerationMetadata>
  }
  update: (result: ImageGenerationResult) => Promise<void>
}
