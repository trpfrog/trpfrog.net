import React from 'react'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vite-plus/test'

// React.cache is canary feature, so we need to declare it to use it in vitest
React.cache = fn => fn

expect.extend(matchers)

// Mock server-only for client environment tests
vi.mock('server-only', () => ({}))

declare global {
  var __UI_SDK_STRICT__: boolean | undefined
}
// Fail tests on ui-sdk development warnings, such as a control without a name
globalThis.__UI_SDK_STRICT__ = true

// happy-dom has no Popover API, so ui-sdk would fall back to the path for older
// browsers and leave closed popups out of the DOM. The stubs keep tests on the
// path real browsers take. Top-layer placement still needs a browser check.
if (typeof HTMLElement !== 'undefined') {
  for (const key of ['showPopover', 'hidePopover'] as const) {
    if (!(key in HTMLElement.prototype)) {
      Object.defineProperty(HTMLElement.prototype, key, { value: () => {}, configurable: true })
    }
  }
}

// Ensure React Testing Library cleans up between tests, and that saved settings
// in one test never leak into the next
afterEach(() => {
  cleanup()
  if (typeof window !== 'undefined') localStorage.clear()
})
