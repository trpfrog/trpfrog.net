import { endpoints } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

import type { AppType } from './[[...route]]/route.ts'

// eslint-disable-next-line n/no-process-env
export const bffClient = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL || endpoints.website).api
