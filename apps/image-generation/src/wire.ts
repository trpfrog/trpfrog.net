import { removeSuffixFromKeys } from '@trpfrog.net/utils'
import { wire } from '@trpfrog.net/utils/wire'

import { AITrpFrogImageRepo } from '@/domain/repos/image-repo'
import { ChatLLMJson } from '@/domain/services/llm'
import { TextToImage } from '@/domain/services/text-to-image'
import * as rawUsecases from '@/usecases'

export const usecases = removeSuffixFromKeys('Usecase', rawUsecases)

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
