// @ts-check
import '@testing-library/jest-dom'
import React from 'react'

import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// React.cache is canary feature, so we need to declare it to use it in vitest
React.cache = fn => fn

// Mock server-only for client environment tests
vi.mock('server-only', () => ({}))

// Ensure React Testing Library cleans up between tests
afterEach(() => {
  cleanup()
})
