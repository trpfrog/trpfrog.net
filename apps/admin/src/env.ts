import * as v from 'valibot'

import { validateUnknown } from '@trpfrog.net/utils'

export const env = validateUnknown(
  v.object({
    TRPFROG_FUNCTIONS_SECRET: v.string(),
    ADMIN_PASSWORD: v.string(),
    TRPFROG_ADMIN_KEY: v.string(),
  }),
  // oxlint-disable-next-line node/no-process-env
  process.env,
)
