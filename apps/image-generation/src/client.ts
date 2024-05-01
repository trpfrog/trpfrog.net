import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

export {
  TrpFrogImageGenerationResultSchema,
  type TrpFrogImageGenerationResult,
} from './trpfrog-diffusion/generateNew'

import type { AppType } from '.'

export const trpfrogDiffusionClient = hc<AppType>(endpoints.imageGeneration!)
