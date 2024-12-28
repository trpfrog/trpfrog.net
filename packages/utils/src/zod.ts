import { z } from 'zod'

export const stringifiedBooleanSchema = z
  .enum(['true', 'false'])
  .default('false')
  .transform(v => v === 'true')
