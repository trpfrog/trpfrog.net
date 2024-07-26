import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

export {
  TrpFrogImageGenerationResultSchema,
  type TrpFrogImageGenerationResult,
} from './trpfrog-diffusion/schema'

import type { AppType } from './app'

export function createTrpFrogImageGenerationClient(env: 'development' | 'production' | 'test') {
  return hc<AppType>(endpoints(env).imageGeneration)
}
