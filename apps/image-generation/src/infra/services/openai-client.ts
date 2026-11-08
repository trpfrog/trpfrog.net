import { createOpenAI } from '@ai-sdk/openai'
import { getContext } from 'hono/context-storage'

import { Env } from '../../env'

export function createOpenAIClient(apiKey?: string) {
  return createOpenAI({ apiKey: apiKey ?? getContext<Env>().env.OPENAI_API_KEY })
}
