import { services } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

export {
  TrpFrogImageGenerationResultSchema,
  type TrpFrogImageGenerationResult,
} from './trpfrog-diffusion/schema'

import type { AppType } from './app'

export function createTrpFrogImageGenerationClient(env: 'development' | 'production' | 'test') {
  const endpoint = services.imageGeneration.endpoint(env)
  if (endpoint == null) {
    throw new Error('Image generation service is not available in this environment')
  }
  return hc<AppType>(endpoint)
}
