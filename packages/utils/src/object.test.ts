import { describe, it, expect } from 'vitest'

import { removePrefixFromKeys, removeSuffixFromKeys } from './object'

describe('removePrefixFromKeys', () => {
  const testCases: {
    description: string
    prefix: string
    input: Record<string, unknown>
    expectedOutput: Record<string, unknown>
  }[] = [
    {
      description: 'removes the specified prefix from the keys of an object',
      prefix: 'prefix',
      input: { prefixName: 'John', prefixAge: 30, prefixCity: 'New York' },
      expectedOutput: { Name: 'John', Age: 30, City: 'New York' },
    },
    {
      description: 'does not modify keys without the prefix',
      prefix: 'prefix',
      input: { prefixName: 'John', Age: 30, prefixCity: 'New York' },
      expectedOutput: { Name: 'John', Age: 30, City: 'New York' },
    },
    {
      description: 'handles objects with no matching prefixes gracefully',
      prefix: 'prefix',
      input: { Name: 'John', Age: 30, City: 'New York' },
      expectedOutput: { Name: 'John', Age: 30, City: 'New York' },
    },
    {
      description: 'handles an empty object',
      prefix: 'prefix',
      input: {},
      expectedOutput: {},
    },
    {
      description: 'works with non-string values',
      prefix: 'prefix',
      input: { prefixNumber: 42, prefixBoolean: true, prefixObject: { nested: 'value' } },
      expectedOutput: { Number: 42, Boolean: true, Object: { nested: 'value' } },
    },
    {
      description: 'is case-sensitive with prefixes',
      prefix: 'prefix',
      input: { prefixName: 'John', PrefixName: 'Doe' },
      expectedOutput: { Name: 'John', PrefixName: 'Doe' },
    },
  ]

  testCases.forEach(({ description, prefix, input, expectedOutput }) => {
    it(description, () => {
      const result = removePrefixFromKeys(prefix, input)
      expect(result).toEqual(expectedOutput)
    })
  })
})

describe('removeSuffixFromKeys', () => {
  const testCases: {
    description: string
    suffix: string
    input: Record<string, unknown>
    expectedOutput: Record<string, unknown>
  }[] = [
    {
      description: 'removes the specified suffix from the keys of an object',
      suffix: 'Suffix',
      input: { nameSuffix: 'John', ageSuffix: 30, citySuffix: 'New York' },
      expectedOutput: { name: 'John', age: 30, city: 'New York' },
    },
    {
      description: 'does not modify keys without the suffix',
      suffix: 'Suffix',
      input: { nameSuffix: 'John', age: 30, citySuffix: 'New York' },
      expectedOutput: { name: 'John', age: 30, city: 'New York' },
    },
    {
      description: 'handles objects with no matching suffixes gracefully',
      suffix: 'Suffix',
      input: { name: 'John', age: 30, city: 'New York' },
      expectedOutput: { name: 'John', age: 30, city: 'New York' },
    },
    {
      description: 'handles an empty object',
      suffix: 'Suffix',
      input: {},
      expectedOutput: {},
    },
    {
      description: 'works with non-string values',
      suffix: 'Suffix',
      input: { numberSuffix: 42, booleanSuffix: true, objectSuffix: { nested: 'value' } },
      expectedOutput: { number: 42, boolean: true, object: { nested: 'value' } },
    },
    {
      description: 'is case-sensitive with suffixes',
      suffix: 'Suffix',
      input: { nameSuffix: 'John', nameSUFFIX: 'Doe' },
      expectedOutput: { name: 'John', nameSUFFIX: 'Doe' },
    },
  ]

  testCases.forEach(({ description, suffix, input, expectedOutput }) => {
    it(description, () => {
      const result = removeSuffixFromKeys(suffix, input)
      expect(result).toEqual(expectedOutput)
    })
  })
})
