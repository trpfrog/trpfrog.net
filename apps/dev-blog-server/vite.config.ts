import { defineConfig } from 'vite-plus'

export default defineConfig({
  // Builds only the Hono RPC client. The server itself runs from source on Bun.
  pack: {
    entry: 'client.ts',
    sourcemap: true,
    dts: { sourcemap: true },
    deps: { neverBundle: true },
  },
  test: {
    passWithNoTests: true,
  },
})
