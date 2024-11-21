import { expectTypeOf } from 'vitest'

import { PickDependencies } from './types'

describe('PickDependencies', () => {
  /**
   * Sample RequiredDependencies type for testing
   */
  type Deps = {
    a: number
    b: string
    c: boolean
    d: null
    e: undefined
  }

  test('with single key', () => {
    // When T is a single key of RequiredDependencies
    type PickedA = PickDependencies<Deps, 'a'>
    type Expected = Pick<Deps, 'a'> // Expected type is { a: number }
    expectTypeOf<PickedA>().toEqualTypeOf<Expected>()
  })

  test('with multiple keys', () => {
    // When T is multiple keys of RequiredDependencies
    type PickedAB = PickDependencies<Deps, 'a' | 'b'>
    type Expected = Pick<Deps, 'a' | 'b'> // Expected type is { a: number; b: string }
    expectTypeOf<PickedAB>().toEqualTypeOf<Expected>()
  })

  test('with function', () => {
    // When T is a function that takes RequiredDependencies
    type PickedA = PickDependencies<Deps, (deps: Pick<Deps, 'a'>) => unknown>
    type Expected = Pick<Deps, 'a'>
    expectTypeOf<PickedA>().toEqualTypeOf<Expected>()
  })

  test('with function and additional arguments', () => {
    // When T is a function that takes RequiredDependencies and additional arguments
    type PickedA = PickDependencies<Deps, (deps: Pick<Deps, 'a'>, x: number, y: string) => unknown>
    type Expected = Pick<Deps, 'a'>
    expectTypeOf<PickedA>().toEqualTypeOf<Expected>()
  })

  test('with key and function', () => {
    // When T is a combination of keys and functions
    type PickedA = PickDependencies<Deps, 'a' | ((deps: Pick<Deps, 'b'>) => unknown)>
    type Expected = Pick<Deps, 'a' | 'b'>
    expectTypeOf<PickedA>().toEqualTypeOf<Expected>()
  })

  test('with nested functions', () => {
    // When T is a nested function that takes RequiredDependencies
    type Fn1 = (deps: PickDependencies<Deps, 'a'>) => unknown
    type Fn2 = (deps: PickDependencies<Deps, 'b' | Fn1>) => unknown
    type Fn3 = (deps: PickDependencies<Deps, 'c' | Fn2>) => unknown
    type Picked = PickDependencies<Deps, (deps: PickDependencies<Deps, 'd' | Fn3>) => unknown>
    type Expected = Pick<Deps, 'a' | 'b' | 'c' | 'd'>
    expectTypeOf<Picked>().toEqualTypeOf<Expected>()
  })
})
