import path from 'node:path'

import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    isolate: true,
    // mockReturnValue などで差し替えた実装と vi.stubGlobal を、テストごとに元へ戻す
    mockReset: true,
    restoreMocks: true,
    unstubGlobals: true,
    // テストが実行順に頼らないよう、ファイル内のテストを毎回シャッフルする
    sequence: {
      shuffle: { files: false, tests: true },
    },
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
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@blog': path.resolve(import.meta.dirname, './src/app/blog'),
    },
    server: {
      deps: {
        inline: ['react-tweet'],
      },
    },
  },
})
