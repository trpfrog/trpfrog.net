import { RuleTester } from 'vite-plus/lint/plugins-dev'
import { describe, it } from 'vite-plus/test'

import { requireDisableReason } from './plugin'

RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('require-disable-reason', requireDisableReason, {
  valid: [
    '// oxlint-disable-next-line no-console -- ログを出す\nconsole.log(1)',
    'console.log(1) // oxlint-disable-line no-console -- ログを出す',
    '/* oxlint-disable no-console -- このファイルはログを出す */',
    '// eslint-disable-next-line no-console -- ログを出す\nconsole.log(1)',
    '// oxlint-enable no-console',
    '// disable the cache here',
  ],
  invalid: [
    {
      code: '// oxlint-disable-next-line no-console\nconsole.log(1)',
      errors: [{ messageId: 'missingReason' }],
    },
    {
      code: 'console.log(1) // eslint-disable-line no-console',
      errors: [{ messageId: 'missingReason' }],
    },
    {
      code: '/* oxlint-disable no-console */',
      errors: [{ messageId: 'missingReason' }],
    },
    {
      code: '// oxlint-disable-next-line no-console --\nconsole.log(1)',
      errors: [{ messageId: 'missingReason' }],
    },
    {
      code: '// oxlint-disable-next-line\nconsole.log(1)',
      errors: [{ messageId: 'missingReason' }],
    },
  ],
})
