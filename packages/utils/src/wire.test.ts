import { describe, it, expect, expectTypeOf } from 'vitest'

import { wire } from './wire'

describe('DependencyBuilder and wire function', () => {
  const functions = {
    depA: (deps: { value: number }) => deps.value * 2,
    depB: (deps: { value: string }) => deps.value.toUpperCase(),
    depC: (deps: { a: number; b: string }) => `Number: ${deps.a}, String: ${deps.b}`,
  }

  it('should correctly resolve dependencies', () => {
    const builder = wire(functions)
      .inject({
        depA: { value: 5 },
        depB: { value: 'hello' },
      })
      .inject(resolved => ({
        depC: { a: resolved.depA, b: resolved.depB },
      }))

    const resolvedDependencies = builder.build()

    expect(resolvedDependencies.depA).toBe(10)
    expect(resolvedDependencies.depB).toBe('HELLO')
    expect(resolvedDependencies.depC).toBe('Number: 10, String: HELLO')
  })

  it('should throw an error if dependencies are not resolved', () => {
    const incompleteBuilder = wire(functions).inject({
      depA: { value: 5 },
    })

    expect(() => incompleteBuilder.build()).toThrowError(
      'The following functions have unresolved dependencies: depB, depC',
    )
  })

  it('should not overwrite dependencies unless overwrite is called', () => {
    const builder = wire(functions).inject({
      depA: { value: 5 },
    })

    expect(() =>
      builder.inject({
        // @ts-expect-error - This should throw an error because depA is already resolved
        depA: { value: 10 },
      }),
    ).toThrowError('Dependency depA is already resolved')
  })

  it('should overwrite dependencies when overwrite is called', () => {
    const builder = wire({
      depA: (deps: { value: number }) => deps.value * 2,
    })
      .inject({
        depA: { value: 5 },
      })
      .overwrite({
        depA: { value: 10 },
      })

    const resolvedDependencies = builder.build()

    expect(resolvedDependencies.depA).toBe(20)
  })

  it('should have correct types', () => {
    const builder = wire(functions)
      .inject({
        depA: { value: 5 },
        depB: { value: 'hello' },
      })
      .inject(resolved => {
        expectTypeOf(resolved.depA).toBeNumber()
        expectTypeOf(resolved.depB).toBeString()
        return {
          depC: { a: resolved.depA, b: resolved.depB },
        }
      })

    const resolvedDependencies = builder.build()

    // Type assertions for the resolved dependencies
    expectTypeOf(resolvedDependencies).toEqualTypeOf<{
      depA: number
      depB: string
      depC: string
    }>()

    expectTypeOf(resolvedDependencies.depA).toBeNumber()
    expectTypeOf(resolvedDependencies.depB).toBeString()
    expectTypeOf(resolvedDependencies.depC).toBeString()
  })

  it('should handle empty dependencies correctly', () => {
    const emptyFunctions = {}
    const builder = wire(emptyFunctions)

    const resolvedDependencies = builder.build()

    expect(resolvedDependencies).toEqual({})
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    expectTypeOf(resolvedDependencies).toEqualTypeOf<{}>()
  })

  it('should allow function dependencies to be injected via a function', () => {
    const builder = wire(functions)
      .inject({
        depA: { value: 3 },
        depB: { value: 'test' },
      })
      .inject(resolved => {
        expectTypeOf(resolved.depA).toBeNumber()
        expectTypeOf(resolved.depB).toBeString()
        return {
          depC: { a: resolved.depA, b: resolved.depB },
        }
      })

    const resolvedDependencies = builder.build()

    expect(resolvedDependencies.depC).toBe('Number: 6, String: TEST')
  })
})
