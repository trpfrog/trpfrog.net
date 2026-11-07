import { bindings, defineConfig } from 'cf/config'

export default defineConfig(ctx => ({
  worker: {
    name: 'content-server',
    compatibilityDate: '2024-12-28',
    compatibilityFlags: ['nodejs_compat'],
    entrypoint: './src/index.ts',
    domains: ['content.trpfrog.net'],
    env: {
      // `cf dev --mode development` serves posts in real time instead of the
      // statically generated ones. The variable is unset in production.
      TRPFROG_NET_CONTENT_SERVER_SOURCE_STRATEGY:
        ctx.mode === 'development' && bindings.text('dev-realtime'),
      ASSETS: bindings.assets(),
    },
  },
}))
