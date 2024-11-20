import { AITrpFrogImageRepo } from './image-repo'
import { ChatLLMJson } from './llm'
import { RandomWordGenerator } from './random-words'
import { TextToImage } from './text-to-image'

export interface RequiredDependencies {
  fetchRandomWords: RandomWordGenerator
  generateImage: TextToImage
  jsonChatbot: ChatLLMJson
  imageRepo: AITrpFrogImageRepo
}

export type Deps<T extends keyof RequiredDependencies> = Pick<RequiredDependencies, T>
