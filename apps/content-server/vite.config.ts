import { cloudflare } from '@cloudflare/vite-plugin'
import ssg from '@hono/vite-ssg'
import { defineConfig, type PluginOption } from 'vite-plus'

// - `vp build --mode ssg` pre-renders ./src/ssg.ts into ./.ssg.
// - `cf dev` / `cf build` / `cf deploy` serve ./.ssg as the Worker's static
//   assets (ASSETS binding). The Worker config lives in cloudflare.config.ts.
// - Vitest runs in Node.js without either plugin.
function plugins(mode: string): PluginOption[] {
  if (mode === 'test') return []
  if (mode === 'ssg') return [ssg({ entry: './src/ssg.ts' })]
  return [
    cloudflare({
      inspectorPort: 8103,
      // Bindings are inferred from cloudflare.config.ts directly.
      types: { generate: false },
    }),
  ]
}

export default defineConfig(({ mode }) => ({
  // Builds only the Hono RPC client. The Worker itself is built by the Cloudflare plugin.
  pack: {
    entry: 'src/client.ts',
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
  },
  plugins: plugins(mode),
  publicDir: mode === 'ssg' ? false : '.ssg',
  // `dist` is reserved for `vp pack` outputs.
  build: mode === 'ssg' ? { outDir: '.ssg' } : undefined,
  server: {
    port: 8003,
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
    environment: 'node',
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
    passWithNoTests: true,
  },
}))
