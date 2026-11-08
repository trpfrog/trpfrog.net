export type ChatRole = 'system' | 'user' | 'assistant'

export type ChatUtterance = {
  role: ChatRole
  text: string
}

type WithMetadata<T> = { response: T; modelName: string; raw?: unknown }

/** The model responded, but its output did not match the requested schema. */
export class InvalidChatLLMOutputError extends Error {}

export type ChatLLMJsonOptions = {
  /** JSON Schema the response must conform to */
  schema: Record<string, unknown>
  schemaName: string
}

export type ChatLLMJson = (
  chat: ChatUtterance[],
  options: ChatLLMJsonOptions,
) => Promise<WithMetadata<Record<string, unknown>>>
