import { describe, it, expect } from 'vitest'

import { removePrefixFromKeys } from './object'

describe('removePrefixFromKeys', () => {
  it('removes the specified prefix from the keys of an object', () => {
    const input = {
      prefixName: 'John',
      prefixAge: 30,
      prefixCity: 'New York',
    }
    const expectedOutput = {
      Name: 'John',
      Age: 30,
      City: 'New York',
    }
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual(expectedOutput)
  })

  it('does not modify keys without the prefix', () => {
    const input = {
      prefixName: 'John',
      Age: 30,
      prefixCity: 'New York',
    }
    const expectedOutput = {
      Name: 'John',
      Age: 30,
      City: 'New York',
    }
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual(expectedOutput)
  })

  it('handles objects with no matching prefixes gracefully', () => {
    const input = {
      Name: 'John',
      Age: 30,
      City: 'New York',
    }
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual(input) // Should be the same object
  })

  it('handles an empty object', () => {
    const input = {}
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual({})
  })

  it('works with non-string values', () => {
    const input = {
      prefixNumber: 42,
      prefixBoolean: true,
      prefixObject: { nested: 'value' },
    }
    const expectedOutput = {
      Number: 42,
      Boolean: true,
      Object: { nested: 'value' },
    }
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual(expectedOutput)
  })

  it('is case-sensitive with prefixes', () => {
    const input = {
      prefixName: 'John',
      PrefixName: 'Doe',
    }
    const expectedOutput = {
      Name: 'John',
      PrefixName: 'Doe',
    }
    const result = removePrefixFromKeys('prefix', input)
    expect(result).toEqual(expectedOutput)
  })
})
