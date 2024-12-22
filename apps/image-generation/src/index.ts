import { z } from 'zod'

import { createApp } from './controller'
import { adminApp } from './controller/devPage'
import { imageMetadataRepoCloudflareD1WithKV } from './infra/repos/imageMetadataRepoCloudflareD1WithKV'
import { imageStoreRepoCloudflareR2 } from './infra/repos/imageStoreRepoCloudflareR2'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { randomWordApi } from './infra/services/random-words'
import { createHfImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

const env = z
  .object({
    HUGGINGFACE_TOKEN: z.string(),
    OPENAI_API_KEY: z.string(),
  })
  // eslint-disable-next-line n/no-process-env
  .parse(process.env)

const app = createApp(
  prepareUsecasesBuilder({
    imageStoreRepo: imageStoreRepoCloudflareR2,
    imageMetadataRepo: imageMetadataRepoCloudflareD1WithKV,
    textToImage: createHfImageGenerator({
      modelName: 'Prgckwb/trpfrog-sd3.5-large-lora',
      hfToken: env.HUGGINGFACE_TOKEN,
    }),
    jsonChatbot: createOpenAIChatLLMJson({
      model: 'gpt-4o-2024-11-20',
      temperature: 0.9,
      apiKey: env.OPENAI_API_KEY,
    }),
    generateSeedWords: () => randomWordApi(10),
  }).build(),
)

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
