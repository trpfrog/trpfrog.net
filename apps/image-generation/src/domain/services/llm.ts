export type ChatRole = 'system' | 'user' | 'assistant'

export type ChatUtterance = {
  role: ChatRole
  text: string
}

type WithMetadata<T> = { response: T; modelName: string; raw?: unknown }

export type ChatLLM = (chat: ChatUtterance[]) => Promise<WithMetadata<string>>

export type ChatLLMJson = (chat: ChatUtterance[]) => Promise<WithMetadata<Record<string, unknown>>>
