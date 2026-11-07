import { cloudflare } from '@cloudflare/vite-plugin'
import ssg from '@hono/vite-ssg'
import { defineConfig, type PluginOption } from 'vite-plus'

// - `vp build --mode ssg` pre-renders ./src/ssg.ts into ./dist.
// - `cf dev` / `cf build` / `cf deploy` serve ./dist as the Worker's static
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
  plugins: plugins(mode),
  publicDir: mode === 'ssg' ? false : 'dist',
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
