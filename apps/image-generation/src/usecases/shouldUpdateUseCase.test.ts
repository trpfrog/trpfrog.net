import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { ImageUpdateStatus } from '../domain/entities/image-update-status'
import { IMAGE_STALE_MINUTES } from '../domain/entities/stale'
import * as getRefreshedImageUpdateStatus from '../domain/services/getRefreshedImageUpdateStatus'

import { shouldUpdateUseCase } from './shouldUpdateUseCase'

const latestRecord = {
  id: '1',
  prompt: {
    author: 'author',
    text: 'text',
    translated: 'translated',
  },
  modelName: 'model',
  imageUri: 'http://example.com/image.png',
}

function createInMemoryImageUpdateStatusRepo(initialStatus: ImageUpdateStatus) {
  let status: ImageUpdateStatus = initialStatus
  return {
    get: async () => {
      return status
    },
    set: async (newStatus: ImageUpdateStatus) => {
      status = newStatus
    },
  }
}

describe('shouldUpdateUseCase', () => {
  const currentDate = new Date('2024-12-14T12:34:56+09:00')
  const staleDate = new Date(currentDate.getTime() - (IMAGE_STALE_MINUTES + 1) * 60 * 1000)
  const freshDate = new Date(currentDate.getTime() - (IMAGE_STALE_MINUTES - 1) * 60 * 1000)

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(currentDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const testCases: {
    description: string
    deps?: Partial<Parameters<typeof shouldUpdateUseCase>[0]>
    isForceUpdate?: boolean
    latestImageCreatedAt: Date
    imageUpdateStatus?: ImageUpdateStatus
    expected: boolean
  }[] = [
    {
      description: '画像が新しい場合、更新をスキップするべき',
      latestImageCreatedAt: freshDate,
      expected: false,
    },
    {
      description: '画像が古い場合、更新するべき',
      latestImageCreatedAt: staleDate,
      expected: true,
    },
    {
      description: '画像が現在更新中の場合、更新をスキップするべき',
      latestImageCreatedAt: staleDate,
      imageUpdateStatus: { status: 'updating', startedAt: currentDate },
      expected: false,
    },
    {
      description: '最近の更新が失敗し、waitMinutes が 0 より大きい場合、更新をスキップするべき',
      latestImageCreatedAt: staleDate,
      imageUpdateStatus: {
        status: 'error',
        occurredAt: staleDate,
      },
      expected: false,
    },
    {
      description: 'forceUpdate が true の場合、画像が新しくても更新するべき',
      latestImageCreatedAt: freshDate,
      isForceUpdate: true,
      expected: true,
    },
    {
      description: 'forceUpdate が true の場合、エラー発生直後でも更新するべき',
      latestImageCreatedAt: freshDate,
      imageUpdateStatus: { status: 'error', occurredAt: currentDate },
      isForceUpdate: true,
      expected: true,
    },
  ]

  testCases.forEach(props => {
    it(props.description, async () => {
      // refresh する処理別途テストがあるので今回は無視する
      const spy = vi
        .spyOn(getRefreshedImageUpdateStatus, 'getRefreshedImageUpdateStatus')
        .mockImplementation(status => status)

      const shouldUpdate = shouldUpdateUseCase({
        imageMetadataRepo: {
          getLatest: async () => ({
            ...latestRecord,
            createdAt: props.latestImageCreatedAt ?? currentDate,
          }),
          add: async () => {},
          remove: async () => {},
          count: async () => 0,
          query: async () => [],
        },
        imageUpdateStatusRepo: createInMemoryImageUpdateStatusRepo(
          props.imageUpdateStatus ?? { status: 'idle' },
        ),
        ...(props.deps ?? {}),
      })

      const result = await shouldUpdate({
        forceUpdate: props.isForceUpdate,
      })
      expect(result.shouldUpdate).toBe(props.expected)
      spy.mockRestore()
    })
  })
})
