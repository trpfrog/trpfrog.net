import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { TrpFrogImagePrompt } from '../domain/entities/generation-result'

import {
  generatePromptFromWordsUsecase,
  __internal_OutputWithReasoning as OutputWithReasoning,
} from './generate-prompt-from-words'

describe('generateRandomTrpFrogPrompt', () => {
  const defaultResponse: TrpFrogImagePrompt = {
    prompt: 'an icon of trpfrog testing the function',
    translated: '関数のテストをするつまみさんの画像',
  }

  const { resolve } = createSingleDepsResolver(generatePromptFromWordsUsecase, {
    jsonChatbot: async () =>
      ({
        basic: { reasoning: 'reasoning', prompt: 'prompt' },
        creative: { reasoning: 'reasoning', prompt: 'prompt' },
        polished: { reasoning: 'reasoning', prompt: 'prompt' },
        final: { reasoning: 'reasoning', prompt: defaultResponse.prompt },
        translated: defaultResponse.translated,
      }) satisfies OutputWithReasoning,
  })

  const testCases: {
    description: string
    deps: Parameters<typeof resolve>[0]
    expected: TrpFrogImagePrompt
  }[] = [
    {
      description: 'should generate a prompt successfully',
      deps: {},
      expected: defaultResponse,
    },
    {
      description: 'generates a prompt with a single word',
      deps: {},
      expected: defaultResponse,
    },
    {
      description: 'should generate a prompt even if reasoning step fails',
      deps: {
        jsonChatbot: async () => ({
          final: { prompt: defaultResponse.prompt },
          translated: defaultResponse.translated,
        }),
      },
      expected: defaultResponse,
    },
  ]

  testCases.forEach(({ description, deps, expected }) => {
    it(description, async () => {
      const generatePromptFromWords = resolve(deps)
      const result = await generatePromptFromWords(['word1', 'word2'])
      expect(result).toMatchObject(expected)
    })
  })

  it('handles errors when chatbot return invalid json', async () => {
    const generatePromptFromWords = resolve({
      jsonChatbot: async () => ({
        greeting: 'hello',
      }),
    })
    expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      'Failed to parse chatbot response JSON',
    )
  })

  it('throws unexpected LLM errors', async () => {
    const generatePromptFromWords = resolve({
      jsonChatbot: async () => {
        throw new Error('Unexpected error')
      },
    })
    expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError('Unexpected error')
  })
})
