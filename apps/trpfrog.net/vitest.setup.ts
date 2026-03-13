import React from 'react'

import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vite-plus/test'

// React.cache is canary feature, so we need to declare it to use it in vitest
React.cache = fn => fn

expect.extend(matchers)

// Mock server-only for client environment tests
vi.mock('server-only', () => ({}))

// Ensure React Testing Library cleans up between tests
afterEach(() => {
  cleanup()
})
