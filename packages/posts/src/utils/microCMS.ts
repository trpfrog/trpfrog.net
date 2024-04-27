import { createClient } from 'microcms-js-sdk'

const client = createClient({
  serviceDomain: 'trpfrog',
  // eslint-disable-next-line n/no-process-env
  apiKey: process.env.MICRO_CMS_API_KEY!,
})

export { client as microCMS }
