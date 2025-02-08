import * as v from 'valibot'

export const CommonEnvSchema = v.object({
  VERCEL_ENV: v.optional(v.string(), 'development'),
  VERCEL_URL: v.optional(v.string()),
  NODE_ENV: v.optional(v.picklist(['development', 'production', 'test']), 'development'),
})
