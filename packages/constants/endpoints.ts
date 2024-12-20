import { defineEndpoints } from '@trpfrog.net/utils'

export const services = defineEndpoints({
  website: {
    port: 3000,
    production: 'https://trpfrog.net',
  },
  imageGeneration: {
    port: 8001,
    production: 'https://api.trpfrog.net',
    basePath: '/icongen',
  },
  mdServer: {
    port: 8002,
    production: null,
  },
})
