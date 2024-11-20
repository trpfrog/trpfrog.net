export type ChatRole = 'system' | 'user' | 'assistant'

export type ChatUtterance = {
  role: ChatRole
  text: string
}

export type ChatLLM = (chat: ChatUtterance[]) => Promise<string>

export type ChatLLMJson = (chat: ChatUtterance[]) => Promise<Record<string, unknown>>
