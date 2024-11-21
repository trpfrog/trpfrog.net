import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'

import { isImageStale } from './stale'

describe('isImageStale', () => {
  const fixedNow = new Date('2023-01-01T00:00:00Z')

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  type TestCase = {
    description: string
    lastGenerated: Date
    minUpdateMinutes: number
    expected: { shouldCache: boolean; waitMinutes: number }
  }

  const testCases: TestCase[] = [
    {
      description: 'recently generated image',
      lastGenerated: new Date(fixedNow.getTime() - 60 * 1000), // 1 minute ago
      minUpdateMinutes: 180,
      expected: { shouldCache: true, waitMinutes: 179 },
    },
    {
      description: 'stale image',
      lastGenerated: new Date(fixedNow.getTime() - 181 * 60 * 1000), // 181 minutes ago
      minUpdateMinutes: 180,
      expected: { shouldCache: false, waitMinutes: 0 },
    },
    {
      description: 'image generated within minUpdateMinutes',
      lastGenerated: new Date(fixedNow.getTime() - 100 * 60 * 1000), // 100 minutes ago
      minUpdateMinutes: 180,
      expected: { shouldCache: true, waitMinutes: 80 },
    },
  ]

  testCases.forEach(({ description, lastGenerated, minUpdateMinutes, expected }) => {
    it(`should return correct values for ${description}`, () => {
      const result = isImageStale(lastGenerated, fixedNow, minUpdateMinutes)
      expect(result).toEqual(expected)
    })
  })
})
