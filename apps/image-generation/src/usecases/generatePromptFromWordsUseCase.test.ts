import { describe, it, expect } from 'vite-plus/test'

import { createSingleDepsResolver } from '@trpfrog.net/utils'

import { ImagePrompt } from '../domain/entities/generation-result'
import { ChatLLMJson, ChatUtterance, InvalidChatLLMOutputError } from '../domain/services/llm'
import { generatePromptFromWordsUseCase } from './generatePromptFromWordsUseCase'

const briefFields = {
  scene: 'A test scene.',
  style: 'A test style.',
  composition: 'A test composition.',
}

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
        ...briefFields,
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
            ...briefFields,
          },
          modelName: 'test-model',
        }),
      },
      expected: defaultResponse,
    },
  ]

  it.each(testCases)('$description', async ({ deps, expected }) => {
    const generatePromptFromWords = resolve(deps)
    const result = await generatePromptFromWords(['word1', 'word2'])
    expect(result).toMatchObject(expected)
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

  it('throws unexpected LLM errors without retrying', async () => {
    let calls = 0
    const generatePromptFromWords = resolve({
      jsonChatbot: async () => {
        calls++
        throw new Error('Unexpected error')
      },
    })
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      'Unexpected error',
    )
    expect(calls).toBe(1)
  })

  it('retries when the model output cannot be parsed', async () => {
    let calls = 0
    const generatePromptFromWords = resolve({
      jsonChatbot: async () => {
        calls++
        throw new InvalidChatLLMOutputError('No object generated')
      },
    })
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      'No object generated',
    )
    expect(calls).toBe(4)
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
            ...briefFields,
          }
          break
        case 3:
          response = {
            prompt:
              'A long long long long long long long long long long long long long long tsmami-san reading documents',
            translated: 'ドキュメントを読むつまみさん',
            ...briefFields,
          }
          break
        case 4:
          response = {
            prompt: 'tsmami-san reading documents',
            translated: 'ドキュメントを読むつまみさん',
            ...briefFields,
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
      text: 'tsmami-san reading documents',
      translated: 'ドキュメントを読むつまみさん',
      author: 'test-model',
    })
    expect(finalChat.length).toBe(8)
    expect(finalChat.slice(1)).toMatchInlineSnapshot(`
      [
        {
          "role": "user",
          "text": "Random words:
      docs, learn",
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
      - \`prompt\`: Invalid key: Expected "prompt" but received undefined
      - \`translated\`: Invalid key: Expected "translated" but received undefined
      - \`scene\`: Invalid key: Expected "scene" but received undefined
      - \`style\`: Invalid key: Expected "style" but received undefined
      - \`composition\`: Invalid key: Expected "composition" but received undefined",
        },
        {
          "role": "assistant",
          "text": "{
        "prompt": "This is an invalid prompt, missing \\"ts/mami-san\\"",
        "translated": "これは無効なプロンプトです、\\"つまみさん\\"がありません",
        "scene": "A test scene.",
        "style": "A test style.",
        "composition": "A test composition."
      }",
        },
        {
          "role": "user",
          "text": "Output JSON validation failed:
      - \`prompt\`: must include "tsmami-san"",
        },
        {
          "role": "assistant",
          "text": "{
        "prompt": "A long long long long long long long long long long long long long long tsmami-san reading documents",
        "translated": "ドキュメントを読むつまみさん",
        "scene": "A test scene.",
        "style": "A test style.",
        "composition": "A test composition."
      }",
        },
        {
          "role": "user",
          "text": "Output JSON validation failed:
      - \`prompt\`: must be at most 80 characters (current: 100)
      - \`prompt\`: must be at most 12 words (current: 19)",
        },
      ]
    `)
  })

  it('returns error if the model returns invalid JSON too many times', async () => {
    let calls = 0
    const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, {
      jsonChatbot: async () => {
        calls++
        return {
          response: { wrong: 'shape' },
          modelName: 'test-model',
        }
      },
    })
    const generatePromptFromWords = resolve({})
    await expect(generatePromptFromWords(['word1', 'word2'])).rejects.toThrowError(
      /Output JSON validation failed/,
    )
    expect(calls).toBe(4)
  })

  it('passes a JSON schema to the chatbot and returns an image brief', async () => {
    let receivedOptions: Parameters<ChatLLMJson>[1] | undefined
    const { resolve } = createSingleDepsResolver(generatePromptFromWordsUseCase, {
      jsonChatbot: async (_chat, options) => {
        receivedOptions = options
        return {
          response: {
            prompt: 'tsmami-san baking bread',
            translated: 'パンを焼くつまみさん',
            scene: 'A cozy bakery kitchen at dawn.',
            style: 'Soft watercolor with warm light.',
            composition: 'Eye-level medium shot.',
          },
          modelName: 'test-model',
        }
      },
    })

    const result = await resolve({})(['bread'])

    expect(receivedOptions?.schema).toMatchObject({
      type: 'object',
      additionalProperties: false,
      required: ['prompt', 'translated', 'scene', 'style', 'composition'],
    })
    expect(result).toMatchObject({
      text: 'tsmami-san baking bread',
      translated: 'パンを焼くつまみさん',
      brief: {
        scene: 'A cozy bakery kitchen at dawn.',
        style: 'Soft watercolor with warm light.',
        composition: 'Eye-level medium shot.',
      },
    })
  })
})
