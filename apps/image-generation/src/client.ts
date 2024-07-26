import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

export {
  TrpFrogImageGenerationResultSchema,
  type TrpFrogImageGenerationResult,
} from './trpfrog-diffusion/generateNew'

import type { AppType } from '.'

export function createTrpFrogImageGenerationClient(env: 'development' | 'production' | 'test') {
  return hc<AppType>(endpoints(env).imageGeneration)
}
