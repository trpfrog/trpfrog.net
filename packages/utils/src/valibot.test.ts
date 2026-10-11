import { describe, expect, it } from 'vite-plus/test'

import { StringifiedBooleanSchema, vCoerceDate, vCoerceNumber } from './valibot'
import { safeValidateUnknown, validateUnknown } from './validator'

describe('Valibot schema compatibility', () => {
  it.each([
    [undefined, false],
    ['false', false],
    ['true', true],
  ])('converts a stringified boolean %s to %s', (input, output) => {
    expect(validateUnknown(StringifiedBooleanSchema, input)).toBe(output)
  })

  it.each(['TRUE', '0', '', null, true])('rejects unsupported boolean input %s', input => {
    expect(safeValidateUnknown(StringifiedBooleanSchema, input).success).toBe(false)
  })

  it('preserves the existing integer coercion behavior', () => {
    expect(validateUnknown(vCoerceNumber, 1.5)).toBe(1.5)
    expect(validateUnknown(vCoerceNumber, '12.5')).toBe(12)
    expect(validateUnknown(vCoerceNumber, '12px')).toBe(12)
    expect(safeValidateUnknown(vCoerceNumber, 'not-a-number').success).toBe(false)
  })

  it('converts ISO dates and timestamps to the same instant', () => {
    const date = new Date('2026-08-22T12:00:00.000Z')
    expect(validateUnknown(vCoerceDate, date)).toEqual(date)
    expect(validateUnknown(vCoerceDate, date.toISOString())).toEqual(date)
    expect(validateUnknown(vCoerceDate, date.getTime())).toEqual(date)
  })
})
