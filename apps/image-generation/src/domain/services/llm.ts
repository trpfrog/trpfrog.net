export type ChatRole = 'system' | 'user' | 'assistant'

export type ChatUtterance = {
  role: ChatRole
  text: string
}

type WithMetadata<T> = { response: T; modelName: string; raw?: unknown }

export type ChatLLM = (chat: ChatUtterance[]) => Promise<WithMetadata<string>>

export type ChatLLMJsonOptions = {
  /**
   * JSON Schema the response must conform to (enforced via Structured Outputs).
   * If omitted, the model is only asked to return valid JSON.
   */
  schema?: Record<string, unknown>
  schemaName?: string
}

export type ChatLLMJson = (
  chat: ChatUtterance[],
  options?: ChatLLMJsonOptions,
) => Promise<WithMetadata<Record<string, unknown>>>
