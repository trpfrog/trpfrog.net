import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { refreshImageIfStaleUseCase } from './refreshImageIfStaleUseCase'

describe('refreshImageIfStale', () => {
  const { resolve, defaultDeps } = createSingleDepsResolver(refreshImageIfStaleUseCase, {
    uploadImage: async () => {},
    imageGenerator: async () => ({
      image: {
        modelName: 'model',
        extension: 'png',
        image: new ArrayBuffer(0),
      },
      prompt: {
        author: 'author',
        text: 'text',
        translated: 'translated',
      },
    }),
    imageMetadataRepo: {
      getLatest: async () => ({
        id: '1',
        prompt: {
          author: 'author',
          text: 'text',
          translated: 'translated',
        },
        modelName: 'model',
        createdAt: new Date(),
        imageUri: 'http://example.com/image.png',
      }),
      query: async () => [],
      amount: async () => 0,
      add: async () => {},
      remove: async () => {},
    },
  })

  const testCases: {
    description: string
    deps: Partial<Parameters<typeof resolve>[0]>
    isForceUpdate?: boolean
    expected: { updated: boolean; message?: string; waitMinutes?: number }
  }[] = [
    {
      description: 'should return updated: false if image is not stale',
      deps: {},
      expected: { updated: false },
    },
    {
      description: 'should return updated: true if forceUpdate is true',
      deps: {},
      isForceUpdate: true,
      expected: { updated: true },
    },
    {
      description:
        'should return updated: false if image is stale and waitMinutes is greater than 0',
      deps: {
        imageMetadataRepo: {
          ...defaultDeps.imageMetadataRepo,
          getLatest: async () => ({
            id: '1',
            prompt: {
              author: 'author',
              text: 'text',
              translated: 'translated',
            },
            modelName: 'model',
            createdAt: new Date(Date.now() - 160 * 60 * 1000), // 160 minutes ago
            imageUri: 'http://example.com/image.png',
          }),
        },
      },
      expected: {
        updated: false,
        message: 'Minimum update interval is 180 minutes, please wait 20 minutes.',
        waitMinutes: 20,
      },
    },
    {
      description: 'should return updated: true if image is stale and waitMinutes is 0',
      deps: {
        imageMetadataRepo: {
          ...defaultDeps.imageMetadataRepo,
          getLatest: async () => ({
            id: '1',
            prompt: {
              author: 'author',
              text: 'text',
              translated: 'translated',
            },
            modelName: 'model',
            createdAt: new Date(Date.now() - 181 * 60 * 1000), // 181 minutes ago
            imageUri: 'http://example.com/image.png',
          }),
        },
      },
      expected: { updated: true },
    },
  ]

  testCases.forEach(({ description, deps, isForceUpdate, expected }) => {
    it(description, async () => {
      const refreshImageIfStale = resolve(deps)
      const result = await refreshImageIfStale({
        forceUpdate: isForceUpdate ?? false,
      })
      expect(result).toMatchObject(expected)
    })
  })
})
