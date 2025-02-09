import { validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

export const env = validateUnknown(
  v.object({
    TRPFROG_FUNCTIONS_SECRET: v.string(),
    ADMIN_PASSWORD: v.string(),
    TRPFROG_ADMIN_KEY: v.string(),
  }),
  // eslint-disable-next-line n/no-process-env
  process.env,
)
