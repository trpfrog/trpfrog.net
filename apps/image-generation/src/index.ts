import { createApp } from './controller'
import { assetsRepoWorkersAssets } from './infra/repos/assets-repo-workers-assets'
import { imageMetadataRepoCloudflareD1 } from './infra/repos/imageMetadataRepoCloudflareD1'
import { imageStoreRepoCloudflareR2 } from './infra/repos/imageStoreRepoCloudflareR2'
import { imageUpdateStatusCloudflareKV } from './infra/repos/imageUpdateStatusRepoCloudflareKV'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createGeminiImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

const app = createApp(
  prepareUsecasesBuilder({
    imageStoreRepo: imageStoreRepoCloudflareR2,
    imageMetadataRepo: imageMetadataRepoCloudflareD1,
    imageUpdateStatusRepo: imageUpdateStatusCloudflareKV,
    textToImage: createGeminiImageGenerator({
      modelName: 'gemini-2.5-flash-image',
    }),
    jsonChatbot: createOpenAIChatLLMJson({
      model: 'gpt-5-mini-2025-08-07',
      temperature: 0.9,
    }),
    generateSeedWords: () => randomWordApi(10),
    assetsRepo: assetsRepoWorkersAssets,
  }).build(),
)

// eslint-disable-next-line no-restricted-exports
export default app
