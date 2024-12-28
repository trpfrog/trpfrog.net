import { vi } from 'vitest'

import { ImageStoreRepo } from '../../../domain/repos/image-store-repo'

export function createImageStoreRepoMock() {
  return {
    upload: vi.fn(async (filename: string) => {
      return `https://example.com/${filename}`
    }),
    download: vi.fn(async () => {
      return new ArrayBuffer(0)
    }),
    hardDelete: vi.fn(async () => {
      return
    }),
  } satisfies ImageStoreRepo
}
