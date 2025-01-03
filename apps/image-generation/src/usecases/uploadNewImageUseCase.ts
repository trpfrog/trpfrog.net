import { format } from 'date-fns'
import { uuidv7 } from 'uuidv7'

import { ImagePrompt } from '../domain/entities/generation-result'
import { ImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageStoreRepo } from '../domain/repos/image-store-repo'

export function uploadNewImageUseCase(deps: {
  imageStoreRepo: ImageStoreRepo
  imageMetadataRepo: ImageMetadataRepo
}) {
  return async (
    imageData: ArrayBuffer,
    metadata: {
      prompt: ImagePrompt
      modelName: string
      createdAt?: Date
      imageExtension: string
    },
  ) => {
    const { prompt, modelName, createdAt = new Date(), imageExtension: ext } = metadata
    const filename = `${format(createdAt, 'yyyy-MM-dd-HH-mm-ss')}${ext}`

    const imageUri = await deps.imageStoreRepo.upload(filename, imageData)
    try {
      await deps.imageMetadataRepo.add({
        id: uuidv7(),
        prompt,
        modelName,
        createdAt,
        imageUri,
      })
    } catch (e) {
      console.error(e)
      await deps.imageStoreRepo.hardDelete(filename)
      throw e
    }
  }
}
