import { validate } from '@trpfrog.net/utils'
import { getContext } from 'hono/context-storage'
import * as v from 'valibot'

import { Bindings } from '../worker-configuration'

export type Variables = Record<string, never>

export type Env = { Bindings: Bindings; Variables: Record<string, string> & Variables }

export const getVars = () =>
  validate(
    v.object({
      TRPFROG_NET_CONTENT_SERVER_SOURCE_STRATEGY: v.optional(
        v.picklist(['dev-realtime', 'static-generated']),
        'static-generated',
      ),
    }),
    getContext<Env>().env,
  )
