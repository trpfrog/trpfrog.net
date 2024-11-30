import { removeSuffixFromKeys } from '@trpfrog.net/utils'
import { wire } from '@trpfrog.net/utils/wire'

import { currentImageUsecase, currentMetadataUsecase } from './current-image'
import { generateImageUsecase } from './generate-image'
import { generatePromptFromWordsUsecase } from './generate-prompt-from-words'
import { generateRandomImageUsecase } from './generate-random-image'
import { refreshImageIfStaleUsecase } from './update-image'

import { AITrpFrogImageRepo } from '@/domain/repos/image-repo'
import { ChatLLMJson } from '@/domain/services/llm'
import { TextToImage } from '@/domain/services/text-to-image'

export const usecases = removeSuffixFromKeys('Usecase', {
  generateImageUsecase,
  generatePromptFromWordsUsecase,
  refreshImageIfStaleUsecase,
  currentImageUsecase,
  currentMetadataUsecase,
  generateRandomImageUsecase,
})

export type Usecases = {
  [K in keyof typeof usecases]: ReturnType<(typeof usecases)[K]>
}

export function prepareUsecasesBuilder(common: {
  imageRepo: AITrpFrogImageRepo
  textToImage: TextToImage
  jsonChatbot: ChatLLMJson
  generateSeedWords: () => Promise<string[]>
}) {
  const { imageRepo, textToImage, jsonChatbot, generateSeedWords } = common
  return wire(usecases)
    .inject({
      currentImage: {
        imageRepo,
      },
      currentMetadata: {
        imageRepo,
      },
      generateImage: {
        textToImage,
      },
      generatePromptFromWords: {
        jsonChatbot,
      },
    })
    .inject(ucs => ({
      generateRandomImage: {
        generatePromptFromSeedWords: seedWords => ucs.generatePromptFromWords(seedWords),
        generateImage: prompt => ucs.generateImage(prompt, { numberOfRetries: 3 }),
        generateSeedWords,
      },
    }))
    .inject(ucs => ({
      refreshImageIfStale: {
        imageRepo,
        imageGenerator: () => ucs.generateRandomImage(),
      },
    }))
}
