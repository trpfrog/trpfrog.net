import { z } from 'zod'

export const ApiKeySchema = z.object({
  openaiApiKey: z.string(),
  hfToken: z.string(),
})
