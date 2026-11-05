import { bindings, defineConfig, triggers } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'trpfrog-diffusion',
    compatibilityDate: '2023-12-01',
    compatibilityFlags: ['nodejs_compat', 'nodejs_compat_v2', 'rpc'],
    entrypoint: './src/index.ts',
    observability: {
      enabled: true,
    },
    triggers: [
      triggers.fetch({
        pattern: 'api.trpfrog.net/icongen',
        zone: 'trpfrog.net',
      }),
      triggers.fetch({
        pattern: 'api.trpfrog.net/icongen/*',
        zone: 'trpfrog.net',
      }),
      triggers.scheduled({
        schedule: '0 */6 * * *',
      }),
    ],
    env: {
      KV: bindings.kv({
        id: '17627d198edc43588fcd79b65b239e55',
      }),
      OPENAI_API_KEY: bindings.secret(),
      TRPFROG_FUNCTIONS_SECRET: bindings.secret(),
      BUCKET: bindings.r2({
        name: 'trpfrog-media',
      }),
      // D1 migrations live in ./migrations, the default directory of
      // `cf d1 migrations apply`.
      DATABASE: bindings.d1({
        name: 'ai-trpfrog-icon-db',
        id: '66534e4a-091f-4bd3-be8e-07cbf7e70842',
      }),
      ASSETS: bindings.assets(),
    },
  },
})
