import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import 'vite-plus/test'

// Augment the runner entry point we use, not jest-dom's separate Vitest peer instance.
declare module 'vite-plus/test' {
  interface Matchers<R = void, T = unknown> extends TestingLibraryMatchers<T, R> {}
}
