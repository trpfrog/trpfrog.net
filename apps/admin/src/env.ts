import { z } from 'zod'

export const env = z
  .object({
    TRPFROG_FUNCTIONS_SECRET: z.string(),
    ADMIN_PASSWORD: z.string(),
  })
  // eslint-disable-next-line n/no-process-env
  .parse(process.env)
