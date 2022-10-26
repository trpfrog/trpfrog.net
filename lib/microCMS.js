import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: 'trpfrog',
  apiKey: process.env.MICRO_CMS_API_KEY,
});

export default client
