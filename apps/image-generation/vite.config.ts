import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite-plus'

export default defineConfig(({ mode }) => ({
  // The Worker config lives in cloudflare.config.ts. Skip the plugin under
  // Vitest so tests run in Node.js as before.
  plugins:
    mode === 'test'
      ? []
      : [
          cloudflare({
            inspectorPort: 8101,
            // Bindings are inferred from cloudflare.config.ts directly.
            types: { generate: false },
          }),
        ],
  publicDir: 'assets',
  server: {
    port: 8001,
  },
  environments: {
    ssr: {
      build: {
        minify: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    clearMocks: true,
    restoreMocks: true,
    pool: 'threads',
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'lcov', 'html'],
      reportOnFailure: true,
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
}))
