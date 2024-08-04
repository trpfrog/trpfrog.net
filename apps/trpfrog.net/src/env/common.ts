import { z } from 'zod'

export const CommonEnvSchema = z.object({
  VERCEL_ENV: z.string().default('development'),
  VERCEL_URL: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})
