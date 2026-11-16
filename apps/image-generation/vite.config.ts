import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite-plus'

import { devOriginDefine } from '@trpfrog.net/constants'

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
            // 既定の 9229 からの空き探しは、同時に起動した Worker 同士でぶつかるので OS に選ばせる
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
  // @trpfrog.net/constants が Worker の中でも開発時の origin を決められるようにする
  define: devOriginDefine(),
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
