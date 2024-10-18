import { defineEndpoints } from './defineEndpoints'

export const services = defineEndpoints({
  website: {
    port: 3000,
    production: 'https://trpfrog.net',
  },
  imageGeneration: {
    port: 8001,
    production: 'https://production.trpfrog-diffusion.trpfrog.workers.dev',
  },
  mdServer: {
    port: 8002,
    production: null,
  },
})
