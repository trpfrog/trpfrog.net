import { createApp } from '@/app'
import { adminApp } from '@/app/devPage'
import { workersTrpFrogImageRepo } from '@/infra/repos/image-repo'
import { createOpenAIChatLLMJson } from '@/infra/services/llm'
import { randomWordApi } from '@/infra/services/random-words'
import { createHfImageGenerator } from '@/infra/services/text-to-image'

const app = createApp(env => ({
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
}))

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
