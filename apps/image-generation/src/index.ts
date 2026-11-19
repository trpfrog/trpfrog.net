import { app } from './app'
import { scheduled } from './scheduled'

// oxlint-disable-next-line eslint/no-restricted-exports -- Cloudflare Workers は default export のハンドラを呼ぶ
export default {
  fetch: app.fetch,
  scheduled,
}
