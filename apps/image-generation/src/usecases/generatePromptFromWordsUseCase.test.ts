import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { ImagePrompt } from '../domain/entities/generation-result'
import { ChatLLMJson } from '../domain/services/llm'

import { generatePromptFromWordsUseCase } from './generatePromptFromWordsUseCase'

describe('generateRandomTrpFrogPrompt', () => {
  const defaultResponse: ImagePrompt = {
    author: 'test-model',
    text: 'an icon of trpfrog testing the function',
    translated: '関数のテストをするつまみさんの画像',
  }

  const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, {
    jsonChatbot: async () => ({
      response: {
        basic: { reasoning: 'reasoning', prompt: 'prompt' },
        creative: { reasoning: 'reasoning', prompt: 'prompt' },
        polished: { reasoning: 'reasoning', prompt: 'prompt' },
        final: { reasoning: 'reasoning', prompt: defaultResponse.text },
        translated: defaultResponse.translated,
      },
      modelName: 'test-model',
    }),
  })

  const testCases: {
    description: string
    deps: Parameters<typeof resolve>[0]
    expected: ImagePrompt
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
        jsonChatbot: async (): ReturnType<ChatLLMJson> => ({
          response: {
            final: { prompt: defaultResponse.text },
            translated: defaultResponse.translated,
          },
          modelName: 'test-model',
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
      jsonChatbot: async (): ReturnType<ChatLLMJson> => ({
        response: {
          greeting: 'hello',
        },
        modelName: 'test-model',
      }),
    })
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      'Failed to parse chatbot response JSON',
    )
  })

  it('throws unexpected LLM errors', async () => {
    const generatePromptFromWords = resolve({
      jsonChatbot: async () => {
        throw new Error('Unexpected error')
      },
    })
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      'Unexpected error',
    )
  })
})
