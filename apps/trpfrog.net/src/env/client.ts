import { CommonEnvSchema } from '@/env/common'

export const clientEnv = CommonEnvSchema.extend({})
  // eslint-disable-next-line n/no-process-env -- This is a rule to use validated env instead of process.env
  .parse(process.env)
