import { createApp } from './controller'
import { assetsRepoWorkersAssets } from './infra/repos/assets-repo-workers-assets'
import { imageMetadataRepoCloudflareD1 } from './infra/repos/imageMetadataRepoCloudflareD1'
import { imageStoreRepoCloudflareR2 } from './infra/repos/imageStoreRepoCloudflareR2'
import { imageUpdateStatusCloudflareKV } from './infra/repos/imageUpdateStatusRepoCloudflareKV'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createOpenAIImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

export const app = createApp(
  prepareUsecasesBuilder({
    imageStoreRepo: imageStoreRepoCloudflareR2,
    imageMetadataRepo: imageMetadataRepoCloudflareD1,
    imageUpdateStatusRepo: imageUpdateStatusCloudflareKV,
    textToImage: createOpenAIImageGenerator({
      modelName: 'gpt-image-2.6-sunburst',
      size: '1024x1024',
      quality: 'medium',
    }),
    jsonChatbot: createOpenAIChatLLMJson({
      model: 'gpt-6-luna',
      reasoningEffort: 'medium',
    }),
    generateSeedWords: () => randomWordApi({ noun: 4, verb: 2, adjective: 2 }),
    assetsRepo: assetsRepoWorkersAssets,
  }).build(),
)
