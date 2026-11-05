import { createOpenAI, type OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { generateText, jsonSchema, Output, type JSONSchema7, type ModelMessage } from 'ai'
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
  reasoningEffort?: OpenAIResponsesProviderOptions['reasoningEffort']
  apiKey?: string
}

function createClient(params: OpenAIChatParams) {
  const c = getContext<Env>()
  return createOpenAI({ apiKey: params.apiKey ?? c.env.OPENAI_API_KEY })
}

export function createOpenAIChatLLM(params: OpenAIChatParams): ChatLLM {
  return async rawChat => {
    const openai = createClient(params)

    const { text, response } = await generateText({
      model: openai(params.model),
      messages: toModelMessages(rawChat),
      providerOptions: {
        openai: {
          reasoningEffort: params.reasoningEffort,
        } satisfies OpenAIResponsesProviderOptions,
      },
    })

    return {
      response: text,
      modelName: params.model,
      raw: response,
    }
  }
}

export function createOpenAIChatLLMJson(params: OpenAIChatParams): ChatLLMJson {
  return async (rawChat, options) => {
    const openai = createClient(params)

    const { output, response } = await generateText({
      model: openai(params.model),
      messages: toModelMessages(rawChat),
      output: options?.schema
        ? Output.object({
            schema: jsonSchema<Record<string, unknown>>(options.schema as JSONSchema7),
            name: options.schemaName,
          })
        : Output.json({ name: options?.schemaName }),
      providerOptions: {
        openai: {
          strictJsonSchema: true,
          reasoningEffort: params.reasoningEffort,
        } satisfies OpenAIResponsesProviderOptions,
      },
    })

    if (output == null || typeof output !== 'object' || Array.isArray(output)) {
      throw new Error('Chatbot response is not a JSON object')
    }

    return {
      response: output as Record<string, unknown>,
      modelName: params.model,
      raw: response,
    }
  }
}
