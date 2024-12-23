import { createSingleDepsResolver } from '@trpfrog.net/utils'
import { describe, it, expect } from 'vitest'

import { ImageUpdateStatus } from '../domain/repos/image-update-status-repo'

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
  })

  const TOO_OLD_DATE = new Date(0)

  const testCases: {
    description: string
    deps?: Partial<Parameters<typeof resolve>[0]>
    isForceUpdate?: boolean
    latestImageCreatedAt: Date
    imageUpdateStatus?: ImageUpdateStatus
    expected: { updated: boolean; message?: string; waitMinutes?: number }
  }[] = [
    {
      description: '画像が古くない場合、更新をスキップするべき',
      latestImageCreatedAt: new Date(),
      expected: { updated: false },
    },
    {
      description: 'forceUpdate が true の場合、画像が新しくても更新するべき',
      latestImageCreatedAt: new Date(),
      isForceUpdate: true,
      expected: { updated: true },
    },
    {
      description: 'forceUpdate が true の場合、エラー発生直後でも更新するべき',
      latestImageCreatedAt: new Date(),
      imageUpdateStatus: { status: 'error', occurredAt: new Date() },
      isForceUpdate: true,
      expected: { updated: true },
    },
    {
      description: '画像が160分前に更新されていた場合、更新をスキップするべき',
      latestImageCreatedAt: new Date(new Date().getTime() - 160 * 60 * 1000), // 160 minutes ago
      expected: {
        updated: false,
        message: 'Minimum update interval is 180 minutes, please wait 20 minutes.',
        waitMinutes: 20,
      },
    },
    {
      description: '画像が古く、waitMinutes が 0 の場合、更新するべき',
      latestImageCreatedAt: TOO_OLD_DATE,
      expected: { updated: true },
    },
    {
      description: '画像が現在更新中の場合、更新をスキップするべき',
      latestImageCreatedAt: TOO_OLD_DATE,
      imageUpdateStatus: { status: 'updating', startedAt: new Date() },
      expected: {
        updated: false,
        message: 'Image is currently updating, please wait.',
        waitMinutes: 0,
      },
    },
    {
      description: '最近の更新が失敗し、waitMinutes が 0 より大きい場合、更新をスキップするべき',
      latestImageCreatedAt: TOO_OLD_DATE,
      imageUpdateStatus: {
        status: 'error',
        occurredAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      },
      expected: {
        updated: false,
        message: 'Recent update failed, please wait before trying again.',
        waitMinutes: 20,
      },
    },
  ]

  testCases.forEach(props => {
    it(props.description, async () => {
      const refreshImageIfStale = resolve({
        imageMetadataRepo: {
          ...defaultDeps.imageMetadataRepo,
          getLatest: async () => ({
            ...latestRecord,
            createdAt: props.latestImageCreatedAt ?? new Date(),
          }),
        },
        imageUpdateStatusRepo: createInMemoryImageUpdateStatusRepo(
          props.imageUpdateStatus ?? { status: 'idle' },
        ),
        ...(props.deps ?? {}),
      })
      const result = await refreshImageIfStale({
        forceUpdate: props.isForceUpdate ?? false,
      })
      expect(result).toMatchObject(props.expected)
    })
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
  })
})
