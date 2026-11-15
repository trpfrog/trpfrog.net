import { describe, test, expect } from 'vite-plus/test'

import { resolvePortlessOrigin } from './portless.ts'

describe('resolvePortlessOrigin', () => {
  const appNames = ['app', 'api.app']

  test.each([
    ['https://app.localhost', 'api.app', 'https://api.app.localhost'],
    ['https://api.app.localhost', 'app', 'https://app.localhost'],
    ['https://fix-ui.app.localhost', 'api.app', 'https://fix-ui.api.app.localhost'],
    ['http://fix-ui.api.app.localhost:1355', 'app', 'http://fix-ui.app.localhost:1355'],
    ['https://fix-ui.app.test', 'api.app', 'https://fix-ui.api.app.test'],
  ])('%s -> %s', (portlessUrl, target, expected) => {
    expect(resolvePortlessOrigin(portlessUrl, appNames, target)).toBe(expected)
  })

  test('returns null when the URL does not belong to any known app', () => {
    expect(resolvePortlessOrigin('https://other.localhost', appNames, 'app')).toBe(null)
  })
})
