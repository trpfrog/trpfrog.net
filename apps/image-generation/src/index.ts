import { createApp } from './controller'
import { adminApp } from './controller/devPage'
import { workersTrpFrogImageRepo } from './infra/repos/image-repo'
import { createOpenAIChatLLMJson } from './infra/services/llm'
import { createHfImageGenerator } from './infra/services/text-to-image'
import { prepareUsecasesBuilder } from './wire'

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

  const builder = prepareUsecasesBuilder({
    imageRepo,
    textToImage,
    jsonChatbot,
    generateSeedWords: async () => ['a'],
  })

  return builder.build()
})

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
