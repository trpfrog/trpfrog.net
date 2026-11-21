import { Hono } from 'hono'

import { ssgAssetsRoute } from '@trpfrog.net/dev-blog-server/ssg-assets'

// This will be the target for SSG and can be accessed via ASSETS binding
const ssgTargetApp = new Hono().route('/assets', ssgAssetsRoute)

// oxlint-disable-next-line eslint/no-restricted-exports -- @hono/vite-ssg は default export を読む
export default ssgTargetApp
