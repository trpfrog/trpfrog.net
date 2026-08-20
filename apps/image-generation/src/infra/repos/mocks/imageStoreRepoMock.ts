import { vi } from 'vite-plus/test'

import { ImageStoreRepo } from '../../../domain/repos/image-store-repo'

export function createImageStoreRepoMock() {
  return {
    upload: vi.fn<ImageStoreRepo['upload']>(async filename => {
      return `https://example.com/${filename}`
    }),
    download: vi.fn<ImageStoreRepo['download']>(async () => {
      return new ArrayBuffer(0)
    }),
    hardDelete: vi.fn<ImageStoreRepo['hardDelete']>(async () => {
      return
    }),
  } satisfies ImageStoreRepo
}
