import { describe, it, expect, vi } from 'vitest'

import { GeneratedImageMetadataRepo } from '../domain/repos/image-metadata-repo'
import { ImageStoreRepo } from '../domain/repos/image-store-repo'

import { uploadNewImageUsecase } from './upload-new-image'

// Mock Repositories
const mockImageStoreRepo = {
  upload: vi.fn(async filename => `https://example.com/${filename}`),
  delete: vi.fn(async () => {}),
  download: vi.fn(async () => new ArrayBuffer(8)),
} satisfies ImageStoreRepo

const mockImageMetadataRepo = {
  add: vi.fn(async () => {}),
  query: vi.fn(async () => []),
  getLatest: vi.fn(async () => undefined),
  amount: vi.fn(async () => 0),
  remove: vi.fn(async () => {}),
} satisfies GeneratedImageMetadataRepo

const imageData = new ArrayBuffer(8)
const metadata: Parameters<ReturnType<typeof uploadNewImageUsecase>>[1] = {
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
    const usecase = uploadNewImageUsecase(mockImageStoreRepo, mockImageMetadataRepo)

    // Act
    await usecase(imageData, metadata)

    // Assert
    expect(mockImageStoreRepo.upload).toHaveBeenCalledWith(expectedFilename, imageData)
    expect(mockImageMetadataRepo.add).toHaveBeenCalledWith({
      id: expect.any(String), // uuidv7 generates a unique string
      prompt: metadata.prompt,
      modelName: metadata.modelName,
      createdAt: metadata.createdAt,
      imageUri: expectedImageUri,
    })
  })

  it('should delete the image if metadata saving fails', async () => {
    mockImageStoreRepo.upload.mockResolvedValueOnce(expectedImageUri)
    mockImageMetadataRepo.add.mockRejectedValueOnce(new Error('Metadata save failed'))

    const usecase = uploadNewImageUsecase(mockImageStoreRepo, mockImageMetadataRepo)

    // Act & Assert
    await expect(usecase(imageData, metadata)).rejects.toThrow('Metadata save failed')

    expect(mockImageStoreRepo.upload).toHaveBeenCalledWith(expectedFilename, imageData)
    expect(mockImageMetadataRepo.add).toHaveBeenCalledWith({
      id: expect.any(String),
      prompt: metadata.prompt,
      modelName: metadata.modelName,
      createdAt: metadata.createdAt,
      imageUri: expectedImageUri,
    })
    expect(mockImageStoreRepo.delete).toHaveBeenCalledWith(expectedFilename)
  })
})
