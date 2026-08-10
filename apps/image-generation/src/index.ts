import { app } from './app'
import { scheduled } from './scheduled'

// oxlint-disable-next-line eslint/no-restricted-exports
export default {
  fetch: app.fetch,
  scheduled,
}
