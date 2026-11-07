import { defineWranglerConfig } from 'wrangler/experimental-config'

export default defineWranglerConfig({
  minify: true,
  assetsDirectory: './assets',
  types: {
    generate: true,
    // Runtime types come from @cloudflare/workers-types.
    includeRuntime: false,
  },
  dev: {
    port: 8001,
    inspectorPort: 8101,
  },
})
