import { removeSuffixFromKeys } from '@trpfrog.net/utils'
import { wire } from '@trpfrog.net/utils/wire'

import { AssetsRepo } from './domain/repos/assets-repo'
import { ImageMetadataRepo } from './domain/repos/image-metadata-repo'
import { ImageStoreRepo } from './domain/repos/image-store-repo'
import { ImageUpdateStatusRepo } from './domain/repos/image-update-status-repo'
import { ChatLLMJson } from './domain/services/llm'
import { TextToImage } from './domain/services/text-to-image'
import * as rawUsecases from './usecases'

export const usecases = removeSuffixFromKeys('UseCase', rawUsecases)

export type UseCases = {
  [K in keyof typeof usecases]: ReturnType<(typeof usecases)[K]>
}

export function prepareUsecasesBuilder(common: {
  imageStoreRepo: ImageStoreRepo
  imageMetadataRepo: ImageMetadataRepo
  imageUpdateStatusRepo: ImageUpdateStatusRepo
  textToImage: TextToImage
  jsonChatbot: ChatLLMJson
  assetsRepo: AssetsRepo
  generateSeedWords: () => Promise<string[]>
}) {
  const {
    imageStoreRepo,
    imageMetadataRepo,
    imageUpdateStatusRepo,
    textToImage,
    jsonChatbot,
    generateSeedWords,
    assetsRepo,
  } = common

  return wire(usecases)
    .inject({
      currentImage: {
        imageMetadataRepo,
        imageStoreRepo,
      },
      currentMetadata: {
        imageMetadataRepo,
      },
      generateImage: {
        textToImage,
      },
      generatePromptFromWords: {
        jsonChatbot,
      },
      generateRandomWords: {
        generateSeedWords,
      },
      uploadNewImage: {
        imageMetadataRepo,
        imageStoreRepo,
      },
      queryImageMetadata: {
        imageMetadataRepo,
      },
      shouldUpdate: {
        imageMetadataRepo,
        imageUpdateStatusRepo,
      },
      softDelete: {
        imageMetadataRepo,
      },
      undelete: {
        imageMetadataRepo,
      },
      fetchAsset: {
        assetsRepo,
      },
    })
    .inject(ucs => ({
      generateRandomImage: {
        generateImage: prompt => ucs.generateImage(prompt, { numberOfRetries: 3 }),
        generatePromptFromSeedWords: seedWords => ucs.generatePromptFromWords(seedWords),
        generateSeedWords: ucs.generateRandomWords,
      },
    }))
    .inject(ucs => ({
      refreshImageIfStale: {
        imageMetadataRepo,
        uploadImage: ucs.uploadNewImage,
        imageGenerator: ucs.generateRandomImage,
        imageUpdateStatusRepo: imageUpdateStatusRepo,
        shouldUpdate: ucs.shouldUpdate,
      },
    }))
}
