import { describe, it, expect, vi } from 'vite-plus/test'

import { createImageMetadataRepoMock } from '../infra/repos/mocks/imageMetadataRepoMock'
import { createImageStoreRepoMock } from '../infra/repos/mocks/imageStoreRepoMock'
import { uploadNewImageUseCase } from './uploadNewImageUseCase'

const deps = {
  imageStoreRepo: createImageStoreRepoMock(),
  imageMetadataRepo: createImageMetadataRepoMock(),
} satisfies Parameters<typeof uploadNewImageUseCase>[0]

const imageData = new ArrayBuffer(8)
const metadata: Parameters<ReturnType<typeof uploadNewImageUseCase>>[1] = {
  prompt: {
    text: 'Test prompt',
    translated: 'テストプロンプト',
    author: 'GPT-4o',
  },
  modelName: 'test-model',
  createdAt: new Date('2024-12-14T12:34:56+09:00'),
  imageExtension: '.png',
}

const expectedFilename = '2024-12-14-12-34-56.png'
const expectedImageUri = 'https://example.com/2024-12-14-12-34-56.png'
// UUID v7 uses 7 as its version nibble and 10xx as its RFC 9562 variant bits.
const UUID_V7_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('uploadNewImageUsecase', () => {
  it('should upload an image, save metadata, and return successfully', async () => {
    const usecase = uploadNewImageUseCase(deps)

    // Act
    await usecase(imageData, metadata)

    // Assert
    expect(deps.imageStoreRepo.upload).toHaveBeenCalledWith(expectedFilename, imageData)
    expect(deps.imageMetadataRepo.add).toHaveBeenCalledWith({
      id: expect.any(String), // uuidv7 generates a unique string
      prompt: metadata.prompt,
      modelName: metadata.modelName,
      createdAt: metadata.createdAt,
      imageUri: expectedImageUri,
    })

    const addedMetadata = deps.imageMetadataRepo.add.mock.calls.at(-1)?.[0]
    expect(addedMetadata?.id).toMatch(UUID_V7_PATTERN)
  })

  it('should delete the image if metadata saving fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    deps.imageStoreRepo.upload.mockResolvedValueOnce(expectedImageUri)
    deps.imageMetadataRepo.add.mockRejectedValueOnce(new Error('Metadata save failed'))

    const usecase = uploadNewImageUseCase(deps)

    // Act & Assert
    await expect(usecase(imageData, metadata)).rejects.toThrow('Metadata save failed')

    expect(deps.imageStoreRepo.upload).toHaveBeenCalledWith(expectedFilename, imageData)
    expect(deps.imageMetadataRepo.add).toHaveBeenCalledWith({
      id: expect.any(String),
      prompt: metadata.prompt,
      modelName: metadata.modelName,
      createdAt: metadata.createdAt,
      imageUri: expectedImageUri,
    })
    expect(deps.imageStoreRepo.hardDelete).toHaveBeenCalledWith(expectedFilename)
    errorSpy.mockRestore()
  })
})
