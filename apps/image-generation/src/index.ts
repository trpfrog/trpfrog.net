import { app } from './app'
import { scheduled } from './scheduled'

// eslint-disable-next-line eslint-core/no-restricted-exports
export default {
  fetch: app.fetch,
  scheduled,
}
