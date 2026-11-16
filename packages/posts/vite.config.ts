import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: [
      'src/core/index.ts',
      'src/preview/index.ts',
      'src/parser/rawTextParser.ts',
      'src/time/index.ts',
      'src/fs/index.ts',
    ],
    unbundle: true,
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
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
})
