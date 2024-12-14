import { createApp } from './controller'
import { adminApp } from './controller/devPage'
import { generatedImageRepoCloudflareD1WithKV } from './infra/repos/image-metadata-cf-d1-kv'
import { imageStoreRepoCloudflareR2 } from './infra/repos/image-store-cf-r2'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createHfImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

const app = createApp(env => {
  const textToImage = createHfImageGenerator({
    modelName: 'Prgckwb/trpfrog-sd3.5-large-lora',
    hfToken: env.HUGGINGFACE_TOKEN,
  })
  const jsonChatbot = createOpenAIChatLLMJson({
    model: 'gpt-4o-mini',
    temperature: 0.9,
    apiKey: env.OPENAI_API_KEY,
  })

  const ucs = prepareUsecasesBuilder({
    imageStoreRepo: imageStoreRepoCloudflareR2,
    imageMetadataRepo: generatedImageRepoCloudflareD1WithKV,
    textToImage,
    jsonChatbot,
    generateSeedWords: () => randomWordApi(10),
  }).build()

  return ucs
})

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
