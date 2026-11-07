import { defineWranglerConfig } from 'wrangler/experimental-config'

export default defineWranglerConfig({
  minify: true,
  assetsDirectory: './dist',
  types: {
    generate: true,
    // Runtime types come from @cloudflare/workers-types.
    includeRuntime: false,
  },
  dev: {
    port: 8003,
    inspectorPort: 8103,
  },
})
