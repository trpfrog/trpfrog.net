import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: 'index.ts',
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
  },
  test: {
    passWithNoTests: true,
  },
})
