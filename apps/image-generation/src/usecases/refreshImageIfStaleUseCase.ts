import { GeneratedImage, ImagePrompt } from '../domain/entities/generation-result'
import { ImageUpdateStatusRepo } from '../domain/repos/image-update-status-repo'

import { shouldUpdateUseCase } from './shouldUpdateUseCase'
import { uploadNewImageUseCase } from './uploadNewImageUseCase'

export function refreshImageIfStaleUseCase(deps: {
  imageUpdateStatusRepo: ImageUpdateStatusRepo
  shouldUpdate: ReturnType<typeof shouldUpdateUseCase>
  uploadImage: ReturnType<typeof uploadNewImageUseCase>
  imageGenerator: () => Promise<{
    image: GeneratedImage
    prompt: ImagePrompt
  }>
}) {
  return async (options?: { forceUpdate?: boolean }) => {
    const shouldUpdateResult = await deps.shouldUpdate(options)

    if (!shouldUpdateResult.shouldUpdate) {
      return {
        updated: false,
        message: shouldUpdateResult.message,
        waitMinutes: shouldUpdateResult.waitMinutes,
      }
    }

    try {
      // 更新中ステータスをセット
      await deps.imageUpdateStatusRepo.set({
        status: 'updating',
        startedAt: new Date(),
      })

      const result = await deps.imageGenerator()
      await deps.uploadImage(result.image.image, {
        modelName: result.image.modelName,
        imageExtension: result.image.extension,
        prompt: result.prompt,
      })

      console.log('Image updated successfully with new prompt:', result.prompt.text)

      // 更新完了ステータスをセット
      await deps.imageUpdateStatusRepo.set({
        status: 'idle',
      })
      return {
        updated: true,
      }
    } catch (e) {
      // 更新に失敗した場合はエラーステータスをセット
      console.error(e)
      await deps.imageUpdateStatusRepo.set({
        status: 'error',
        occurredAt: new Date(),
      })

      return {
        updated: false,
        message: 'Failed to update image, please try again later.',
        waitMinutes: 0,
      }
    }
  }
}
