import { clamp } from '@/lib/utils'

export interface Range {
  min: number
  max: number
}

/** 風船の数として持てる範囲。多すぎると描画が追いつかなくなる */
export const BALLOON_AMOUNT: Range = { min: 0, max: 10_000 }

/** /balloon ページで選べる風船の数 */
export const BALLOON_PAGE_AMOUNT: Range = { min: 1, max: BALLOON_AMOUNT.max }

/** 風船の幅 (px) */
export const BALLOON_SIZE: Range = { min: 1, max: 1000 }

/** 整数に丸めて範囲に収める。数でない値は受け付けない */
export function toIntegerWithin(value: number, range: Range): number | null {
  if (!Number.isFinite(value)) return null
  return clamp(Math.round(value), range.min, range.max)
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('toIntegerWithin', () => {
    it.each([
      { value: 57, expected: 57 },
      { value: 56.6, expected: 57 },
      { value: 0, expected: 1 },
      { value: -3, expected: 1 },
      { value: 5000, expected: 1000 },
    ])('turns $value into $expected', ({ value, expected }) => {
      expect(toIntegerWithin(value, BALLOON_SIZE)).toBe(expected)
    })

    it.each([
      { value: 0, expected: 0 },
      { value: 4.4, expected: 4 },
      { value: 20_000, expected: 10_000 },
    ])('keeps $value balloons as $expected', ({ value, expected }) => {
      expect(toIntegerWithin(value, BALLOON_AMOUNT)).toBe(expected)
    })

    it.each([NaN, Infinity, -Infinity])('rejects %s', value => {
      expect(toIntegerWithin(value, BALLOON_SIZE)).toBeNull()
    })
  })
}
