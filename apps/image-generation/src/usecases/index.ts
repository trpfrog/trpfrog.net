import { createDepsResolver, removeSuffixFromKeys } from '@trpfrog.net/utils'

import { currentImageUsecase, currentMetadataUsecase } from './current-image'
import { generateImageUsecase } from './generate-image'
import { generatePromptFromWordsUsecase } from './generate-prompt-from-words'
import { generateRandomImageUsecase } from './generate-random-image'
import { refreshImageIfStaleUsecase } from './update-image'

export const usecases = removeSuffixFromKeys('Usecase', {
  generateImageUsecase,
  generatePromptFromWordsUsecase,
  refreshImageIfStaleUsecase,
  currentImageUsecase,
  currentMetadataUsecase,
  generateRandomImageUsecase,
})

export const { resolve: prepareUsecases } = createDepsResolver(usecases)

export type Usecases = ReturnType<typeof prepareUsecases>
