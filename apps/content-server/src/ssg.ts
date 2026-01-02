import { ssgAssetsRoute } from '@trpfrog.net/dev-blog-server/ssg-assets'
import { Hono } from 'hono'

// This will be the target for SSG and can be accessed via ASSETS binding
const ssgTargetApp = new Hono().route('/assets', ssgAssetsRoute)

// eslint-disable-next-line no-restricted-exports
export default ssgTargetApp
