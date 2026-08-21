import { vi } from 'vite-plus/test'

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
    add: vi.fn<ImageMetadataRepo['add']>(async data => {
      mockData.push(data)
    }),
    getLatest: vi.fn<ImageMetadataRepo['getLatest']>(async () =>
      mockData.length > 0 ? mockData[mockData.length - 1] : undefined,
    ),
    query: vi.fn<ImageMetadataRepo['query']>(async () => mockData),
    count: vi.fn<ImageMetadataRepo['count']>(async () => mockData.length),
    hardDelete: vi.fn<ImageMetadataRepo['hardDelete']>(async () => {}),
    softDelete: vi.fn<ImageMetadataRepo['softDelete']>(async () => {}),
    undelete: vi.fn<ImageMetadataRepo['undelete']>(async () => {}),
  } satisfies ImageMetadataRepo
}
