import { validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

import { Bindings } from '../worker-configuration'

export type Variables = Record<string, never>

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }

export const env = validateUnknown(
  v.object({
    TRPFROG_NET_CONTENT_SERVER_SOURCE_STRATEGY: v.optional(
      v.picklist(['dev-realtime', 'static-generated']),
      'static-generated',
    ),
  }),
  // eslint-disable-next-line n/no-process-env
  process.env,
)
