import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { JsonOutputParser, StringOutputParser } from '@langchain/core/output_parsers'
import { ChatOpenAI } from '@langchain/openai'
import { match } from 'ts-pattern'

import { ChatLLM, ChatLLMJson, ChatUtterance } from '@/domain/llm'

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
    return await model.pipe(parser).invoke(chat)
  }
}

export function createOpenAIChatLLMJson(
  params: ConstructorParameters<typeof ChatOpenAI>[0],
): ChatLLMJson {
  const model = new ChatOpenAI(params).bind({
    response_format: {
      type: 'json_object',
    },
  })
  return async rawChat => {
    const chat = toLangChainMessage(rawChat)
    const parser = new JsonOutputParser()
    return await model.pipe(parser).invoke(chat)
  }
}
