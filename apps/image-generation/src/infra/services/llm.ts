import { createOpenAI, type OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { generateText, jsonSchema, Output, type JSONSchema7, type ModelMessage } from 'ai'
import { getContext } from 'hono/context-storage'
import { match } from 'ts-pattern'

import { ChatLLM, ChatLLMJson, ChatUtterance } from '../../domain/services/llm'
import { Env } from '../../env'

/** AI SDK は messages 内の system を受け付けないので instructions に分離する */
function toPrompt(rawChat: ChatUtterance[]): { instructions?: string; messages: ModelMessage[] } {
  const instructions = rawChat
    .filter(uttr => uttr.role === 'system')
    .map(uttr => uttr.text)
    .join('\n\n')

  const messages = rawChat.flatMap((uttr): ModelMessage[] =>
    match(uttr.role)
      .with('system', () => [])
      .with('user', role => [{ role, content: uttr.text }])
      .with('assistant', role => [{ role, content: uttr.text }])
      .exhaustive(),
  )

  return { instructions: instructions || undefined, messages }
}

type OpenAIChatParams = {
  model: string
  reasoningEffort?: OpenAIResponsesProviderOptions['reasoningEffort']
  apiKey?: string
}

function createClient(params: OpenAIChatParams) {
  return createOpenAI({ apiKey: params.apiKey ?? getContext<Env>().env.OPENAI_API_KEY })
}

export function createOpenAIChatLLM(params: OpenAIChatParams): ChatLLM {
  return async rawChat => {
    const openai = createClient(params)

    const { text, response } = await generateText({
      model: openai(params.model),
      ...toPrompt(rawChat),
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
      ...toPrompt(rawChat),
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
