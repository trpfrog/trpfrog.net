import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect, vi } from 'vitest'

import { ImageUpdateStatus } from '../domain/entities/image-update-status'

import { refreshImageIfStaleUseCase } from './refreshImageIfStaleUseCase'

const latestRecord = {
  id: '1',
  prompt: {
    author: 'author',
    text: 'text',
    translated: 'translated',
  },
  modelName: 'model',
  createdAt: new Date(),
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
        ...latestRecord,
        createdAt: new Date(),
      }),
      query: async () => [],
      count: async () => 0,
      add: async () => {},
      remove: async () => {},
    },
    imageUpdateStatusRepo: {
      get: async () => ({ status: 'idle' }),
      set: async () => {},
    },
    shouldUpdate: async () => ({
      shouldUpdate: true,
    }),
  })

  it('画像が新しい場合、更新をスキップする', async () => {
    const refreshImageIfStale = resolve({
      shouldUpdate: async () => ({
        shouldUpdate: false,
        message: 'Image is fresh',
        waitMinutes: 0,
      }),
    })

    const result = await refreshImageIfStale()
    expect(result).toMatchObject({ updated: false })
  })

  it('画像生成時は updating になり、生成終了後は idle に戻る', async () => {
    const imageUpdateStatusRepo = createInMemoryImageUpdateStatusRepo({
      status: 'idle',
    })

    let statusDuringUpdate: ImageUpdateStatus | undefined
    const refreshImageIfStale = resolve({
      imageMetadataRepo: {
        ...defaultDeps.imageMetadataRepo,
        getLatest: async () => ({
          ...latestRecord,
          createdAt: new Date(0), // 十分に古い
        }),
      },
      imageUpdateStatusRepo,
      imageGenerator: async () => {
        // 生成中に status を取得するために一時的に status を取得
        statusDuringUpdate = await imageUpdateStatusRepo.get()
        return await defaultDeps.imageGenerator()
      },
    })

    // 生成前は status が idle になっているはず
    const statusBeforeUpdate = await imageUpdateStatusRepo.get()
    expect(statusBeforeUpdate).toMatchObject({ status: 'idle' })

    // 画像生成を実行
    const result = await refreshImageIfStale({ forceUpdate: true })
    expect(result).toMatchObject({ updated: true })

    // 更新中は status が updating になる
    expect(statusDuringUpdate).toMatchObject({ status: 'updating' })

    // 生成完了後は status が idle に戻っている
    const status = await imageUpdateStatusRepo.get()
    expect(status).toMatchObject({ status: 'idle' })
  })

  it('画像生成時にエラーが発生した場合、status が error になる', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const imageUpdateStatusRepo = createInMemoryImageUpdateStatusRepo({
      status: 'idle',
    })

    let statusDuringUpdate: ImageUpdateStatus | undefined
    const refreshImageIfStale = resolve({
      imageMetadataRepo: {
        ...defaultDeps.imageMetadataRepo,
        getLatest: async () => ({
          ...latestRecord,
          createdAt: new Date(0), // 十分に古い
        }),
      },
      imageUpdateStatusRepo,
      imageGenerator: async () => {
        // 生成中に status を取得するために一時的に status を取得
        statusDuringUpdate = await imageUpdateStatusRepo.get()
        throw new Error('Failed to generate image')
      },
    })

    // 生成前は status が idle になっているはず
    const statusBeforeUpdate = await imageUpdateStatusRepo.get()
    expect(statusBeforeUpdate).toMatchObject({ status: 'idle' })

    // 画像生成を実行
    const result = await refreshImageIfStale({ forceUpdate: true })
    expect(result).toMatchObject({ updated: false })

    // 更新中は status が updating になる
    expect(statusDuringUpdate).toMatchObject({ status: 'updating' })

    // 生成エラー後は status が error になる
    const statusAfterrUpdate = await imageUpdateStatusRepo.get()
    expect(statusAfterrUpdate).toMatchObject({ status: 'error' })

    errorSpy.mockRestore()
  })
})
