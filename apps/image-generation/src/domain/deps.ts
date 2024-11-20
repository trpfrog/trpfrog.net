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

export type Deps<T extends keyof RequiredDependencies> = Pick<RequiredDependencies, T>
