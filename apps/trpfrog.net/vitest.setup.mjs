// @ts-check
import '@testing-library/jest-dom'
import React from 'react'

// React.cache is canary feature, so we need to declare it to use it in vitest
React.cache = fn => fn
