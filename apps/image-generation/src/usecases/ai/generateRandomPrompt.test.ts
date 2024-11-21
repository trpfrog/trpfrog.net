import { describe, it, expect, vi } from 'vitest'

import {
  generateRandomTrpFrogPrompt,
  __internal_OutputWithReasoning as OutputWithReasoning,
} from './generateRandomPrompt'

import { Deps } from '@/domain/deps'
import { TrpFrogImagePrompt } from '@/domain/entities/generation-result'
import { ChatLLMJson } from '@/domain/services/llm'

type Dependencies = Deps<typeof generateRandomTrpFrogPrompt>

describe('generateRandomTrpFrogPrompt', () => {
  const defaultResponse: TrpFrogImagePrompt = {
    prompt: 'an icon of trpfrog testing the function',
    translated: '関数のテストをするつまみさんの画像',
  }

  const defaultDeps: Dependencies = {
    jsonChatbot: vi.fn<ChatLLMJson>(
      async () =>
        ({
          basic: { reasoning: 'reasoning', prompt: 'prompt' },
          creative: { reasoning: 'reasoning', prompt: 'prompt' },
          polished: { reasoning: 'reasoning', prompt: 'prompt' },
          final: { reasoning: 'reasoning', prompt: defaultResponse.prompt },
          translated: defaultResponse.translated,
        }) satisfies OutputWithReasoning,
    ),
  }

  it('should generate a prompt successfully', async () => {
    const result = await generateRandomTrpFrogPrompt(defaultDeps, ['word1', 'word2'])
    expect(result).toEqual(defaultResponse)
  })

  it('generates a prompt with a single word', async () => {
    const result = await generateRandomTrpFrogPrompt(defaultDeps, ['word1'])
    expect(result).toEqual(defaultResponse)
  })

  it('throws an error if source words are empty', async () => {
    await expect(() => generateRandomTrpFrogPrompt(defaultDeps, [])).rejects.toThrow()
  })

  it('should generate a prompt even if reasoning step fails', async () => {
    const deps: Dependencies = {
      jsonChatbot: vi.fn<ChatLLMJson>(async () => ({
        final: { prompt: defaultResponse.prompt },
        translated: defaultResponse.translated,
      })),
    }
    const result = await generateRandomTrpFrogPrompt(deps, ['word1', 'word2'])
    expect(result).toEqual(defaultResponse)
  })

  it('handles errors when chatbot return invalid json', async () => {
    const deps: Dependencies = {
      jsonChatbot: vi.fn<ChatLLMJson>(async () => ({
        greeting: 'hello',
      })),
    }
    await expect(() => generateRandomTrpFrogPrompt(deps, ['word1', 'word2'])).rejects.toThrow()
  })

  it('handles unexpected LLM errors', async () => {
    const deps: Dependencies = {
      jsonChatbot: vi.fn<ChatLLMJson>(async () => {
        throw new Error('Unexpected error')
      }),
    }
    await expect(() => generateRandomTrpFrogPrompt(deps, ['word1', 'word2'])).rejects.toThrow()
  })
})
