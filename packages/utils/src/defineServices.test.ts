import { describe, test, expect } from 'vite-plus/test'

import { defineServices } from './defineServices.ts'

describe('defineServices', () => {
  const definitions = {
    web: { name: 'app', production: 'https://example.com' },
    api: { name: 'api.app', production: 'https://api.example.com', basePath: '/v1' },
    internal: { name: 'internal.app', production: null },
  } as const

  test('uses the resolver for development origins', () => {
    const services = defineServices(definitions, {
      resolveDevOrigin: name => `https://${name}.localhost`,
    })
    expect(services.web.development).toBe('https://app.localhost')
    expect(services.api.origin('development')).toBe('https://api.app.localhost')
    expect(services.api.origin('test')).toBe('https://api.app.localhost')
    expect(services.api.origin('production')).toBe('https://api.example.com')
    expect(services.api.basePath).toBe('/v1')
    expect(services.internal.origin('production')).toBe(null)
  })

  test('passes every service name to the resolver', () => {
    const calls: unknown[] = []
    defineServices(definitions, {
      resolveDevOrigin: (name, allNames) => {
        calls.push([name, allNames])
        return null
      },
    })
    expect(calls).toContainEqual(['app', ['app', 'api.app', 'internal.app']])
  })

  test('development is null without a resolver', () => {
    const services = defineServices(definitions)
    expect(services.web.development).toBe(null)
    expect(services.web.origin('development')).toBe(null)
    expect(services.web.origin('production')).toBe('https://example.com')
  })

  test.each([
    [{ name: 'app', production: 'https://example.com/path' }, /must be an origin URL/],
    [{ name: 'app', production: 'not-a-url' }, /Invalid URL/],
    [{ name: '', production: null }, /Invalid length/],
    [{ name: 'app', production: null, basePath: 'no-slash' }, /Invalid start/],
  ])('throws for an invalid definition: %o', (definition, message) => {
    expect(() => defineServices({ web: definition })).toThrow(message)
  })
})
