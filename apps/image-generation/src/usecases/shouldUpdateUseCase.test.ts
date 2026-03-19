import { describe, it, expect, beforeEach, afterEach, vi } from 'vite-plus/test'

import { ImageUpdateStatus } from '../domain/entities/image-update-status'
import * as getRefreshedImageUpdateStatus from '../domain/services/getRefreshedImageUpdateStatus'
import { createImageMetadataRepoMock } from '../infra/repos/mocks/imageMetadataRepoMock'
import { createImageUpdateStatusRepoMock } from '../infra/repos/mocks/imageUpdateStatusRepoMock'
import { shouldUpdateUseCase } from './shouldUpdateUseCase'

describe('shouldUpdateUseCase', () => {
  const currentDate = new Date('2024-12-14T12:34:56+09:00')
  const previousDayDate = new Date('2024-12-13T00:00:00+09:00')
  const sameDayDate = new Date('2024-12-14T00:00:00+09:00')

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
      description: '当日生成済みの画像がある場合、更新をスキップするべき',
      latestImageCreatedAt: sameDayDate,
      expected: false,
    },
    {
      description: '当日生成済みの画像がない場合、更新するべき',
      latestImageCreatedAt: previousDayDate,
      expected: true,
    },
    {
      description: '画像が現在更新中の場合、更新をスキップするべき',
      latestImageCreatedAt: previousDayDate,
      imageUpdateStatus: { status: 'updating', startedAt: currentDate },
      expected: false,
    },
    {
      description: '最近の更新が失敗し、waitMinutes が 0 より大きい場合、更新をスキップするべき',
      latestImageCreatedAt: previousDayDate,
      imageUpdateStatus: {
        status: 'error',
        occurredAt: previousDayDate,
      },
      expected: false,
    },
    {
      description: 'forceUpdate が true の場合、当日生成済みでも更新するべき',
      latestImageCreatedAt: sameDayDate,
      isForceUpdate: true,
      expected: true,
    },
    {
      description: 'forceUpdate が true の場合、エラー発生直後でも更新するべき',
      latestImageCreatedAt: sameDayDate,
      imageUpdateStatus: { status: 'error', occurredAt: currentDate },
      isForceUpdate: true,
      expected: true,
    },
  ]

  it.each(testCases)('$description', async props => {
    // refresh する処理別途テストがあるので今回は無視する
    const spy = vi
      .spyOn(getRefreshedImageUpdateStatus, 'getRefreshedImageUpdateStatus')
      .mockImplementation(status => status)

    const shouldUpdate = shouldUpdateUseCase({
      imageMetadataRepo: createImageMetadataRepoMock([
        {
          id: '1',
          createdAt: props.latestImageCreatedAt,
          imageUri: 'http://example.com',
          prompt: { author: 'test', text: 'test', translated: 'test' },
          modelName: 'test',
        },
      ]),
      imageUpdateStatusRepo: createImageUpdateStatusRepoMock(props.imageUpdateStatus),
      ...props.deps,
    })

    const result = await shouldUpdate({
      forceUpdate: props.isForceUpdate,
    })
    expect(result.shouldUpdate).toBe(props.expected)
    spy.mockRestore()
  })
})
