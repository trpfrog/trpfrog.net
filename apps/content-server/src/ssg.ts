import { Hono } from 'hono'

import { ssgAssetsRoute } from '@trpfrog.net/dev-blog-server/ssg-assets'

// This will be the target for SSG and can be accessed via ASSETS binding
const ssgTargetApp = new Hono().route('/assets', ssgAssetsRoute)

// eslint-disable-next-line eslint-core/no-restricted-exports
export default ssgTargetApp
