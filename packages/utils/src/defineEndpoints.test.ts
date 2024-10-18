import { describe, test, expect, expectTypeOf } from 'vitest'

import { defineEndpoints } from './defineEndpoints.ts'

describe('defineEndpoints', () => {
  describe('should correctly parse and return endpoints with all fields provided', () => {
    const endpoints = defineEndpoints({
      api: {
        port: 3000,
        development: 'http://dev.api.local',
        production: 'https://api.example.com',
      },
      auth: {
        port: 4000,
        development: 'http://dev.auth.local',
        production: 'https://auth.example.com',
      },
    })

    test('endpoints.api', () => {
      expect(endpoints.api.port).toBe(3000)
      expect(endpoints.api.development).toBe('http://dev.api.local')
      expect(endpoints.api.production).toBe('https://api.example.com')
      expect(endpoints.api.endpoint('development')).toBe('http://dev.api.local')
      expect(endpoints.api.endpoint('production')).toBe('https://api.example.com')
      expect(endpoints.api.endpoint('test')).toBe('http://dev.api.local')
    })

    test('endpoints.api (type)', () => {
      expectTypeOf(endpoints.api).toEqualTypeOf<{
        port: 3000
        development: 'http://dev.api.local'
        production: 'https://api.example.com'
        endpoint: (env: 'development' | 'production' | 'test') => string | null
      }>()
    })

    test('endpoints.auth', () => {
      expect(endpoints.auth.port).toBe(4000)
      expect(endpoints.auth.development).toBe('http://dev.auth.local')
      expect(endpoints.auth.production).toBe('https://auth.example.com')
      expect(endpoints.auth.endpoint('development')).toBe('http://dev.auth.local')
      expect(endpoints.auth.endpoint('production')).toBe('https://auth.example.com')
      expect(endpoints.auth.endpoint('test')).toBe('http://dev.auth.local')
    })

    test('endpoints.auth (type)', () => {
      expectTypeOf(endpoints.auth).toEqualTypeOf<{
        port: 4000
        development: 'http://dev.auth.local'
        production: 'https://auth.example.com'
        endpoint: (env: 'development' | 'production' | 'test') => string | null
      }>()
    })
  })

  describe('should default development to localhost URL when development is missing but port is provided', () => {
    const endpoints = defineEndpoints({
      api: {
        port: 3000,
        production: 'https://api.example.com',
      },
    })

    test('endpoints.api', () => {
      expect(endpoints.api.development).toBe('http://localhost:3000')
      expect(endpoints.api.endpoint('development')).toBe('http://localhost:3000')
      expect(endpoints.api.endpoint('production')).toBe('https://api.example.com')
      expect(endpoints.api.endpoint('test')).toBe('http://localhost:3000')
    })

    test('endpoints.api (type)', () => {
      expectTypeOf(endpoints.api).toEqualTypeOf<{
        port: 3000
        development: 'http://localhost:3000'
        production: 'https://api.example.com'
        endpoint: (env: 'development' | 'production' | 'test') => string | null
      }>()
    })
  })

  describe('should default development to production when both development and port are missing', () => {
    const endpoints = defineEndpoints({
      metrics: {
        production: 'https://metrics.example.com',
      },
    })

    test('endpoints.metrics', () => {
      expect(endpoints.metrics.development).toBe('https://metrics.example.com')
      expect(endpoints.metrics.production).toBe('https://metrics.example.com')
      expect(endpoints.metrics.endpoint('development')).toBe('https://metrics.example.com')
      expect(endpoints.metrics.endpoint('production')).toBe('https://metrics.example.com')
      expect(endpoints.metrics.endpoint('test')).toBe('https://metrics.example.com')
    })

    test('endpoints.metrics (type)', () => {
      expectTypeOf(endpoints.metrics).toEqualTypeOf<{
        port: undefined
        development: 'https://metrics.example.com'
        production: 'https://metrics.example.com'
        endpoint: (env: 'development' | 'production' | 'test') => string | null
      }>()
    })
  })

  describe('should handle production being null gracefully', () => {
    const endpoints = defineEndpoints({
      api: {
        port: 3000,
        production: null,
      },
    })

    test('endpoints.api', () => {
      expect(endpoints.api.development).toBe('http://localhost:3000')
      expect(endpoints.api.production).toBe(null)
      expect(endpoints.api.endpoint('development')).toBe('http://localhost:3000')
      expect(endpoints.api.endpoint('production')).toBe(null)
      expect(endpoints.api.endpoint('test')).toBe('http://localhost:3000')
    })

    test('endpoints.api (type)', () => {
      expectTypeOf(endpoints.api).toEqualTypeOf<{
        port: 3000
        development: 'http://localhost:3000'
        production: null
        endpoint: (env: 'development' | 'production' | 'test') => string | null
      }>()
    })
  })

  describe('should throw an error when invalid data is provided', () => {
    test('should throw when port is not a number', () => {
      expect(() =>
        defineEndpoints({
          api: {
            port: 'not-a-number' as unknown as number,
            production: 'https://api.example.com',
          },
        }),
      ).toThrow()
    })

    test('should throw when development is not a valid URL', () => {
      expect(() =>
        defineEndpoints({
          api: {
            port: 3000,
            development: 'invalid-url',
            production: 'https://api.example.com',
          },
        }),
      ).toThrow()
    })

    test('should throw when production is not a valid URL', () => {
      expect(() =>
        defineEndpoints({
          api: {
            port: 3000,
            development: 'http://dev.api.local',
            production: 'invalid-url',
          },
        }),
      ).toThrow()
    })
  })
})
