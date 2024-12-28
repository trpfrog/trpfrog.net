import { vi } from 'vitest'

import { ImageMetadata } from '../../../domain/entities/generation-result'
import { ImageMetadataRepo } from '../../../domain/repos/image-metadata-repo'

export function createImageMetadataRepoMock(initialMockData?: ImageMetadata[]) {
  const mockData: ImageMetadata[] = initialMockData ?? [
    {
      id: '1',
      createdAt: new Date(),
      imageUri: 'http://example.com',
      prompt: { author: 'test', text: 'test', translated: 'test' },
      modelName: 'test',
    },
  ]
  mockData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  return {
    add: vi.fn(async data => {
      mockData.push(data)
      return data
    }),
    getLatest: vi.fn(async () => (mockData.length > 0 ? mockData[mockData.length - 1] : undefined)),
    query: vi.fn(async () => mockData),
    count: vi.fn(async () => mockData.length),
    hardDelete: vi.fn(async () => {}),
    softDelete: vi.fn(async () => {}),
    undelete: vi.fn(async () => {}),
  } satisfies ImageMetadataRepo
}
