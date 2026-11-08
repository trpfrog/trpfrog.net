import { type OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import {
  generateText,
  jsonSchema,
  NoObjectGeneratedError,
  Output,
  type JSONSchema7,
  type ModelMessage,
} from 'ai'
import { match } from 'ts-pattern'

import { ChatLLMJson, ChatUtterance, InvalidChatLLMOutputError } from '../../domain/services/llm'
import { createOpenAIClient } from './openai-client'

/** AI SDK は messages 内の system を受け付けないので instructions に分離する */
function toPrompt(rawChat: ChatUtterance[]): { instructions?: string; messages: ModelMessage[] } {
  const instructions = rawChat
    .filter(uttr => uttr.role === 'system')
    .map(uttr => uttr.text)
    .join('\n\n')

  const messages = rawChat.flatMap((uttr): ModelMessage[] =>
    match(uttr.role)
      .with('system', () => [])
      .with('user', 'assistant', role => [{ role, content: uttr.text }])
      .exhaustive(),
  )

  return { instructions: instructions || undefined, messages }
}

type OpenAIChatParams = {
  model: string
  reasoningEffort?: OpenAIResponsesProviderOptions['reasoningEffort']
  apiKey?: string
}

export function createOpenAIChatLLMJson(params: OpenAIChatParams): ChatLLMJson {
  return async (rawChat, { schema, schemaName }) => {
    const openai = createOpenAIClient(params.apiKey)

    try {
      const { output, response } = await generateText({
        model: openai(params.model),
        ...toPrompt(rawChat),
        output: Output.object({
          schema: jsonSchema<Record<string, unknown>>(schema as JSONSchema7),
          name: schemaName,
        }),
        providerOptions: {
          openai: {
            strictJsonSchema: true,
            reasoningEffort: params.reasoningEffort,
          } satisfies OpenAIResponsesProviderOptions,
        },
      })

      return {
        response: output,
        modelName: params.model,
        raw: response,
      }
    } catch (e) {
      if (NoObjectGeneratedError.isInstance(e)) {
        throw new InvalidChatLLMOutputError(e.message, { cause: e })
      }
      throw e
    }
  }
}
