import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: 'index.ts',
    unbundle: true,
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
  },
  test: {
    passWithNoTests: true,
  },
})
