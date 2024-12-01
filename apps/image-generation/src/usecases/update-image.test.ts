import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { refreshImageIfStaleUsecase } from './update-image'

describe('refreshImageIfStale', () => {
  const exampleMetadata = {
    generatedTime: Date.now(),
    prompt: 'prompt',
    translated: 'translated',
  }
  const { resolve, defaultDeps } = createSingleDepsResolver(refreshImageIfStaleUsecase, {
    imageRepo: {
      read: {
        currentMetadata: async () => exampleMetadata,
        currentImage: async () => new ArrayBuffer(0),
      },
      update: async () => {},
    },
    imageGenerator: async () => ({
      ...exampleMetadata,
      arrayBuffer: new ArrayBuffer(0),
    }),
  })

  const testCases: {
    description: string
    deps: Parameters<typeof resolve>[0]
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
        imageRepo: {
          ...defaultDeps.imageRepo,
          read: {
            ...defaultDeps.imageRepo.read,
            currentMetadata: async () => ({
              ...exampleMetadata,
              generatedTime: Date.now() - 160 * 60 * 1000, // 160 minutes ago
            }),
          },
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
        imageRepo: {
          ...defaultDeps.imageRepo,
          read: {
            ...defaultDeps.imageRepo.read,
            currentMetadata: async () => ({
              ...exampleMetadata,
              generatedTime: Date.now() - 181 * 60 * 1000, // 181 minutes ago
            }),
          },
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
