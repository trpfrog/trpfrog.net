import { z } from 'zod'

export const clientEnv = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
  })
  .parse({
    // eslint-disable-next-line n/no-process-env
    NODE_ENV: process.env.NODE_ENV,
  })
