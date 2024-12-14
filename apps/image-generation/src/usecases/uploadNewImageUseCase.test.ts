import { describe, it, expect, vi } from 'vitest'

import { uploadNewImageUseCase } from './uploadNewImageUseCase'

const deps = {
  imageStoreRepo: {
    upload: vi.fn(async filename => `https://example.com/${filename}`),
    delete: vi.fn(async () => {}),
    download: vi.fn(async () => new ArrayBuffer(8)),
  },
  imageMetadataRepo: {
    add: vi.fn(async () => {}),
    query: vi.fn(async () => []),
    getLatest: vi.fn(async () => undefined),
    amount: vi.fn(async () => 0),
    remove: vi.fn(async () => {}),
  },
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
  })

  it('should delete the image if metadata saving fails', async () => {
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
    expect(deps.imageStoreRepo.delete).toHaveBeenCalledWith(expectedFilename)
  })
})
