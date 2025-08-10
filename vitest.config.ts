import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Run project tests in apps/* and packages/*
    projects: ['apps/*', 'packages/*'],
  },
})
