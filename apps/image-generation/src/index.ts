import { createApp } from './controller'
import { adminApp } from './controller/devPage'
import { imageMetadataRepoCloudflareD1 } from './infra/repos/imageMetadataRepoCloudflareD1'
import { imageStoreRepoCloudflareR2 } from './infra/repos/imageStoreRepoCloudflareR2'
import { imageUpdateStatusCloudflareKV } from './infra/repos/imageUpdateStatusRepoCloudflareKV'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createHfImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

const app = createApp(
  prepareUsecasesBuilder({
    imageStoreRepo: imageStoreRepoCloudflareR2,
    imageMetadataRepo: imageMetadataRepoCloudflareD1,
    imageUpdateStatusRepo: imageUpdateStatusCloudflareKV,
    textToImage: createHfImageGenerator({
      modelName: 'Prgckwb/trpfrog-sd3.5-large-lora',
    }),
    jsonChatbot: createOpenAIChatLLMJson({
      model: 'gpt-4o-2024-11-20',
      temperature: 0.9,
    }),
    generateSeedWords: () => randomWordApi(10),
  }).build(),
)

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
