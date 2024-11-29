import { workersTrpFrogImageRepo } from './infra/repos/image-repo'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createHfImageGenerator } from './infra/services/text-to-image'
import { prepareUsecases } from './usecases'

import { createApp } from '@/controller'
import { adminApp } from '@/controller/devPage'

const app = createApp(env => {
  const imageRepo = workersTrpFrogImageRepo
  const textToImage = createHfImageGenerator({
    modelName: 'Prgckwb/trpfrog-sd3.5-large-lora',
    hfToken: env.HUGGINGFACE_TOKEN,
  })
  const jsonChatbot = createOpenAIChatLLMJson({
    model: 'gpt-4o-mini',
    temperature: 0.9,
    apiKey: env.OPENAI_API_KEY,
  })

  const ucs = prepareUsecases({
    currentImage: {
      imageRepo,
    },
    currentMetadata: {
      imageRepo,
    },
    generateImage: {
      textToImage: textToImage,
    },
    generatePromptFromWords: {
      jsonChatbot,
    },
    generateRandomImage: {
      generateSeedWords: () => randomWordApi(10),
      generatePromptFromSeedWords: seedWords => ucs.generatePromptFromWords(seedWords),
      generateImage: prompt => ucs.generateImage(prompt, { numberOfRetries: 3 }),
    },
    refreshImageIfStale: {
      imageRepo,
      imageGenerator: () => ucs.generateRandomImage(),
    },
  })

  return ucs
})

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
