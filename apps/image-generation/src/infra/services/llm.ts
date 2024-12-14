import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { JsonOutputParser, StringOutputParser } from '@langchain/core/output_parsers'
import { ChatOpenAI } from '@langchain/openai'
import { match } from 'ts-pattern'

import { ChatLLM, ChatLLMJson, ChatUtterance } from '../../domain/services/llm'

function toLangChainMessage(rawChat: ChatUtterance[]) {
  return rawChat.map(uttr =>
    match(uttr)
      .with({ role: 'system' }, ({ text }) => new SystemMessage(text))
      .with({ role: 'user' }, ({ text }) => new HumanMessage(text))
      .with({ role: 'assistant' }, ({ text }) => new AIMessage(text))
      .exhaustive(),
  )
}

export function createOpenAIChatLLM(params: ConstructorParameters<typeof ChatOpenAI>[0]): ChatLLM {
  const model = new ChatOpenAI(params)
  return async rawChat => {
    const chat = toLangChainMessage(rawChat)
    const parser = new StringOutputParser()
    return {
      response: await model.pipe(parser).invoke(chat),
      modelName: model.modelName,
    }
  }
}

export function createOpenAIChatLLMJson(
  params: ConstructorParameters<typeof ChatOpenAI>[0],
): ChatLLMJson {
  const rawModel = new ChatOpenAI(params)
  const model = rawModel.bind({
    response_format: {
      type: 'json_object',
    },
  })
  return async rawChat => {
    const chat = toLangChainMessage(rawChat)
    const parser = new JsonOutputParser()
    return {
      response: await model.pipe(parser).invoke(chat),
      modelName: rawModel.modelName,
    }
  }
}
