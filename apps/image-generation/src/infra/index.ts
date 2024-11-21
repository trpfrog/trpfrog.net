import { workersTrpFrogImageRepo } from './repos/image-repo'
import { createOpenAIChatLLMJson } from './services/llm'
import { randomWordApi } from './services/random-words'
import { createHfImageGenerator } from './services/text-to-image'

import { RequiredDependencies } from '@/domain/deps'

export function prepareDefaultDependencies(env: Bindings): RequiredDependencies {
  return {
    fetchRandomWords: randomWordApi,
    generateImage: createHfImageGenerator({
      modelName: 'Prgckwb/trpfrog-sd3.5-large-lora',
      hfToken: env.HUGGINGFACE_TOKEN,
    }),
    jsonChatbot: createOpenAIChatLLMJson({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      apiKey: env.OPENAI_API_KEY,
    }),
    imageRepo: workersTrpFrogImageRepo,
  }
}
