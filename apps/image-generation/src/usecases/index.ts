import { createDepsResolver, removePrefixFromKeys } from '@trpfrog.net/utils'

import { usecase_currentImage, usecase_currentMetadata } from './current-image'
import { usecase_generateImage } from './generate-image'
import { usecase_generatePromptFromWords } from './generate-prompt-from-words'
import { usecase_generateRandomImage } from './generate-random-image'
import { usecase_refreshImageIfStale } from './update-image'

export const usecases = removePrefixFromKeys('usecase_', {
  usecase_generateImage,
  usecase_generatePromptFromWords,
  usecase_refreshImageIfStale,
  usecase_currentImage,
  usecase_currentMetadata,
  usecase_generateRandomImage,
})

export const { resolve: prepareUsecases } = createDepsResolver(usecases)

export type Usecases = ReturnType<typeof prepareUsecases>
