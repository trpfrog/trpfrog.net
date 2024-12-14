import { removeSuffixFromKeys } from '@trpfrog.net/utils'
import { wire } from '@trpfrog.net/utils/wire'

import { ImageMetadataRepo } from './domain/repos/image-metadata-repo'
import { ImageStoreRepo } from './domain/repos/image-store-repo'
import { ChatLLMJson } from './domain/services/llm'
import { TextToImage } from './domain/services/text-to-image'
import * as rawUsecases from './usecases'

export const usecases = removeSuffixFromKeys('Usecase', rawUsecases)

export type Usecases = {
  [K in keyof typeof usecases]: ReturnType<(typeof usecases)[K]>
}

export function prepareUsecasesBuilder(common: {
  imageStoreRepo: ImageStoreRepo
  imageMetadataRepo: ImageMetadataRepo
  textToImage: TextToImage
  jsonChatbot: ChatLLMJson
  generateSeedWords: () => Promise<string[]>
}) {
  const { imageStoreRepo, imageMetadataRepo, textToImage, jsonChatbot, generateSeedWords } = common
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
      },
    }))
}
