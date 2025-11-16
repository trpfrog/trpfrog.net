import { regex } from 'arkregex'

import type { PathString } from './types'

const firstPathRegex = regex('^(?<firstPath>/[^/]*)')

// /about/us -> /about
// /works -> /works
// / -> /
// null -> null
export function getFirstPath(pathname: string | null): PathString | null {
  if (!pathname) {
    return null
  }
  const match = firstPathRegex.exec(pathname)
  return match?.groups?.firstPath ?? null
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('getFirstPath', () => {
    const cases: { input: PathString | null; expected: string | null }[] = [
      { input: '/about/us', expected: '/about' },
      { input: '/works', expected: '/works' },
      { input: '/', expected: '/' },
      { input: null, expected: null },
      { input: '/a/b/c/d/e', expected: '/a' },
    ]

    cases.forEach(({ input, expected }) => {
      it(`returns ${expected} for input ${input}`, () => {
        expect(getFirstPath(input)).toBe(expected)
      })
    })
  })
}
