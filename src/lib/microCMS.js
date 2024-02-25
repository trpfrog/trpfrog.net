import { createClient } from 'microcms-js-sdk'

import { env } from '@/env'

const client = createClient({
  serviceDomain: 'trpfrog',
  apiKey: env.MICRO_CMS_API_KEY,
})

export { client as microCMS }
