import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { ImagePrompt } from '../domain/entities/generation-result'
import { ChatLLMJson, ChatUtterance } from '../domain/services/llm'

import { generatePromptFromWordsUseCase } from './generatePromptFromWordsUseCase'

describe('generateRandomTrpFrogPrompt', () => {
  const defaultResponse: ImagePrompt = {
    author: 'test-model',
    text: 'tsmami-san testing function',
    translated: '関数をテストするつまみさん',
  }

  const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, {
    jsonChatbot: async () => ({
      response: {
        prompt: defaultResponse.text,
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
            prompt: defaultResponse.text,
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
    // p-retry により 3 回試行後に InvalidModelOutputError が投げられる
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      /Output JSON validation failed/,
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

describe('generatePromptFromWordsUseCase retry with feedback', () => {
  it('feeds parse error back to LLM and retries', async () => {
    let call = 0

    let finalChat: ChatUtterance[] = []
    const jsonChatbot: ChatLLMJson = async chat => {
      finalChat = chat
      call++

      let response: Record<string, unknown> = {}
      switch (call) {
        case 1:
          response = { wrong: 'shape' }
          break
        case 2:
          response = {
            prompt: 'This is an invalid prompt, missing "ts/mami-san"',
            translated: 'これは無効なプロンプトです、"つまみさん"がありません',
          }
          break
        case 3:
          response = {
            prompt:
              'A long long long long long long long long long long long long long long tsmami-san reading documents',
            translated: 'ドキュメントを読むつまみさん',
          }
          break
        case 4:
          response = {
            prompt: 'tsmami-san reading documents',
            translated: 'ドキュメントを読むつまみさん',
          }
          break
      }
      return Promise.resolve({
        response,
        modelName: 'test-model',
      })
    }

    const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, { jsonChatbot })
    const generatePromptFromWords = resolve({})

    await expect(generatePromptFromWords(['docs', 'learn'])).resolves.toMatchObject({
      prompt: 'tsmami-san reading documents',
      translated: 'ドキュメントを読むつまみさん',
      author: 'test-model',
    })
    expect(finalChat.length).toBe(8)
    expect(finalChat.slice(1)).toMatchInlineSnapshot(`
      [
        {
          "role": "user",
          "text": "INPUT WORDS:
      docs, learn

      Produce the JSON now.",
        },
        {
          "role": "assistant",
          "text": "{
        "wrong": "shape"
      }",
        },
        {
          "role": "user",
          "text": "Output JSON validation failed:
      - Invalid key: Expected "prompt" but received undefined
      - Invalid key: Expected "translated" but received undefined",
        },
        {
          "role": "assistant",
          "text": "{
        "prompt": "This is an invalid prompt, missing \\"ts/mami-san\\"",
        "translated": "これは無効なプロンプトです、\\"つまみさん\\"がありません"
      }",
        },
        {
          "role": "user",
          "text": "Output JSON validation failed:
      - \`prompt\` must include "tsmami-san"",
        },
        {
          "role": "assistant",
          "text": "{
        "prompt": "A long long long long long long long long long long long long long long tsmami-san reading documents",
        "translated": "ドキュメントを読むつまみさん"
      }",
        },
        {
          "role": "user",
          "text": "Output JSON validation failed:
      - "prompt" must be at most 80 characters (current: 100)
      - "prompt" must be at most 12 words (current: 19)",
        },
      ]
    `)
  })

  it('returns error if the model returns invalid JSON too many times', async () => {
    const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, {
      jsonChatbot: async () => {
        return {
          response: { wrong: 'shape' },
          modelName: 'test-model',
        }
      },
    })
    const generatePromptFromWords = resolve({})
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError()
  })
})
