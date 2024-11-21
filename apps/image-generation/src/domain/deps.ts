import { PickDependencies, PickDependenciesKey } from '@trpfrog.net/utils'

import { AITrpFrogImageRepo } from './repos/image-repo'
import { ChatLLMJson } from './services/llm'
import { RandomWordGenerator } from './services/random-words'
import { TextToImage } from './services/text-to-image'

export interface RequiredDependencies {
  fetchRandomWords: RandomWordGenerator
  generateImage: TextToImage
  jsonChatbot: ChatLLMJson
  imageRepo: AITrpFrogImageRepo
}

/**
 * Pick the dependencies from RequiredDependencies
 * You can use keys from RequiredDependencies or provide a function that takes RequiredDependencies as the first argument.
 */
export type Deps<T extends PickDependenciesKey<RequiredDependencies>> = PickDependencies<
  RequiredDependencies,
  T
>
