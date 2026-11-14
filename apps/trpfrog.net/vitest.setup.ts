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

// happy-dom lacks a few APIs that ui-sdk popups call
if (typeof HTMLElement !== 'undefined') {
  const noop = () => {}
  for (const [target, key] of [
    [HTMLElement.prototype, 'showPopover'],
    [HTMLElement.prototype, 'hidePopover'],
    [Element.prototype, 'scrollIntoView'],
  ] as const) {
    if (!(key in target)) Object.defineProperty(target, key, { value: noop, configurable: true })
  }
  Element.prototype.getAnimations = () => []
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// Ensure React Testing Library cleans up between tests
afterEach(() => {
  cleanup()
})
