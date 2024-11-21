import { prepareDefaultDependencies } from './infra'

import { createApp } from '@/app'
import { adminApp } from '@/app/devPage'

const app = createApp(env => prepareDefaultDependencies(env))

// adminApp を AppType に含めないようにするための対応
// (adminAppではhono/jsxを使用しているため、他のアプリケーションからクライアントを読み込む際に型チェックでエラーが発生する)
app.route('/admin', adminApp)

// eslint-disable-next-line no-restricted-exports
export default app
