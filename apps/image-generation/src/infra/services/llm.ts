import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type ModelMessage } from 'ai'
import { getContext } from 'hono/context-storage'
import { match } from 'ts-pattern'

import { ChatLLM, ChatLLMJson, ChatUtterance } from '../../domain/services/llm'
import { Env } from '../../env'

function toModelMessages(rawChat: ChatUtterance[]): ModelMessage[] {
  return rawChat.map(uttr =>
    match<ChatUtterance, ModelMessage>(uttr)
      .with({ role: 'system' }, ({ text }) => ({ role: 'system', content: text }) as const)
      .with({ role: 'user' }, ({ text }) => ({ role: 'user', content: text }) as const)
      .with({ role: 'assistant' }, ({ text }) => ({ role: 'assistant', content: text }) as const)
      .exhaustive(),
  )
}

type OpenAIChatParams = {
  model: string
  temperature?: number
  apiKey?: string
}

export function createOpenAIChatLLM(params: OpenAIChatParams): ChatLLM {
  return async rawChat => {
    const c = getContext<Env>()
    const apiKey = params.apiKey ?? c.env.OPENAI_API_KEY
    const openai = createOpenAI({ apiKey })

    const { text } = await generateText({
      model: openai(params.model),
      temperature: params.temperature,
      messages: toModelMessages(rawChat),
    })

    return {
      response: text,
      modelName: params.model,
    }
  }
}

export function createOpenAIChatLLMJson(params: OpenAIChatParams): ChatLLMJson {
  return async rawChat => {
    const c = getContext<Env>()
    const apiKey = params.apiKey ?? c.env.OPENAI_API_KEY
    const openai = createOpenAI({ apiKey })

    const { text } = await generateText({
      model: openai(params.model),
      temperature: params.temperature,
      messages: toModelMessages(rawChat),
      providerOptions: {
        openai: {
          response_format: { type: 'json_object' },
        },
      },
    })

    let json: Record<string, unknown>
    try {
      json = JSON.parse(text) as Record<string, unknown>
    } catch {
      throw new Error('Failed to parse chatbot response JSON')
    }

    return {
      response: json,
      modelName: params.model,
    }
  }
}
