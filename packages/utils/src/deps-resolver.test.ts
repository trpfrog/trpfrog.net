import { describe, test, expect, expectTypeOf } from 'vitest'

import { createDepsResolver, createSingleDepsResolver } from './deps-resolver'

describe('createDepsResolver', () => {
  const usecases = {
    usecase1: (deps: { f: () => number }) => () => deps.f() + 1,
    usecase2: (deps: { f: () => string }) => (name: string) => deps.f() + name,
  }

  test('with no default deps', () => {
    const deps = {
      usecase1: { f: () => 1 },
      usecase2: { f: () => 'hello' },
    }
    const { resolve } = createDepsResolver(usecases)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<{
      usecase1: () => number
      usecase2: (name: string) => string
    }>()
    expect(resolved.usecase1()).toBe(deps.usecase1.f() + 1)
    expect(resolved.usecase2(' world')).toBe(deps.usecase2.f() + ' world')
  })

  test('with default deps', () => {
    const deps = {
      usecase1: {},
      usecase2: {},
    }
    const defaultDeps = {
      usecase1: { f: () => 1 },
      usecase2: { f: () => 'hello' },
    }
    const { resolve } = createDepsResolver(usecases, defaultDeps)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<{
      usecase1: () => number
      usecase2: (name: string) => string
    }>()
    expect(resolved.usecase1()).toBe(defaultDeps.usecase1.f() + 1)
    expect(resolved.usecase2(' world')).toBe(defaultDeps.usecase2.f() + ' world')
  })

  test('with default deps overridden', () => {
    const deps = {
      usecase1: { f: () => 2 },
      usecase2: { f: () => 'hi' },
    }
    const defaultDeps = {
      usecase1: { f: () => 1 },
      usecase2: { f: () => 'hello' },
    }
    const { resolve } = createDepsResolver(usecases, defaultDeps)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<{
      usecase1: () => number
      usecase2: (name: string) => string
    }>()
    expect(resolved.usecase1()).toBe(deps.usecase1.f() + 1)
    expect(resolved.usecase2(' world')).toBe(deps.usecase2.f() + ' world')
  })

  test('call twice with same deps', () => {
    const deps = {
      usecase1: { f: () => 2 },
      usecase2: { f: () => 'hi' },
    }
    const defaultDeps = {
      usecase1: { f: () => 1 },
      usecase2: { f: () => 'hello' },
    }
    const { resolve } = createDepsResolver(usecases, defaultDeps)
    const resolved = resolve(deps)
    expect(resolved.usecase1()).toBe(deps.usecase1.f() + 1)
    expect(resolved.usecase1()).toBe(deps.usecase1.f() + 1)
  })
})

describe('createSingleDepsResolver', () => {
  const usecase = (deps: { f: () => number }) => (x: number) => deps.f() + x

  test('with no default deps', () => {
    const deps = { f: () => 1 }
    const { resolve } = createSingleDepsResolver(usecase)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<(x: number) => number>()
    expect(resolved(1)).toBe(deps.f() + 1)
  })

  test('with default deps', () => {
    const deps = {}
    const defaultDeps = { f: () => 1 }
    const { resolve } = createSingleDepsResolver(usecase, defaultDeps)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<(x: number) => number>()
    expect(resolved(1)).toBe(defaultDeps.f() + 1)
  })

  test('with default deps overridden', () => {
    const deps = { f: () => 2 }
    const defaultDeps = { f: () => 1 }
    const { resolve } = createSingleDepsResolver(usecase, defaultDeps)
    const resolved = resolve(deps)
    expectTypeOf(resolved).toEqualTypeOf<(x: number) => number>()
    expect(resolved(1)).toBe(deps.f() + 1)
  })
})
