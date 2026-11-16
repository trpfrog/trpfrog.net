import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite-plus'

import { servicesEnvForVite } from '@trpfrog.net/constants'

export default defineConfig(({ mode }) => ({
  // Builds only the Hono RPC client. The Worker itself is built by the Cloudflare plugin.
  pack: {
    entry: 'src/client.ts',
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
  },
  // The Worker config lives in cloudflare.config.ts. Skip the plugin under
  // Vitest so tests run in Node.js as before.
  plugins:
    mode === 'test'
      ? []
      : [
          cloudflare({
            // inspectorPort は既定で 9229 を使うので、衝突を避けるために自動選択させる (0)
            inspectorPort: 0,
            // Bindings are inferred from cloudflare.config.ts directly.
            types: { generate: false },
          }),
        ],
  publicDir: 'assets',
  server: {
    // `cf dev` 経由では portless が --port を差し込めないので、portless が渡す PORT を読む
    port: Number(process.env.PORT) || undefined,
    strictPort: Boolean(process.env.PORT),
  },
  define: servicesEnvForVite(),
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
