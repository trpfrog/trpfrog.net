/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any -- Allow `any` for creating utility types */

import type { SetOptional, Simplify, IsEqual, UnknownRecord } from 'type-fest'

// `T[K]` が `Partial<T[K]>` であれば `T[K]` 自体を optional にする
type PartialIfAllChildrenAreOptional<T extends Record<string, UnknownRecord>> = SetOptional<
  T,
  {
    // "Partial<T[K]> = T[K]" means "T[K] can be assigned {}"
    [K in keyof T]-?: {} extends T[K] ? K : never
  }[keyof T]
>

// test
true satisfies IsEqual<
  PartialIfAllChildrenAreOptional<{
    a: {}
    b: { b1: string; b2: number }
    c: { c1?: string; c2: number }
    d: { d1?: string; d2?: number }
  }>,
  {
    a?: {} | undefined
    b: { b1: string; b2: number }
    c: { c1?: string; c2: number }
    d?: { d1?: string; d2?: number } | undefined
  }
>

type Internal_OptionalValueIsNotSet = '__internal_optionalValueIsNotSet__'

/**
 * Creates a dependency resolver that resolves dependencies using the provided functions.
 * @param fns
 * @param defaultDeps
 * @returns
 */
export function createDepsResolver<
  Fns extends Record<string, (deps: any) => unknown>,
  DepsDict extends { [K in keyof Fns]: Parameters<Fns[K]>[0] },
  DefaultDeps extends Partial<{ [K in keyof DepsDict]: Partial<DepsDict[K]> }>,
  // prettier-ignore
  Args extends Simplify<
    PartialIfAllChildrenAreOptional<{
      [K in keyof DepsDict]:
        // Allows all keys from DefaultDeps[K] to be optional
        SetOptional<DepsDict[K], keyof DefaultDeps[K]>
    }>
  >,
  Returns extends Simplify<{ [K in keyof Fns]: ReturnType<Fns[K]> }>,
>(fns: Fns, defaultDeps?: DefaultDeps) {
  defaultDeps = defaultDeps ?? ({} as DefaultDeps)

  return {
    defaultDeps,
    // TODO: Consider using Proxy to improve performance by lazily resolving the dependencies
    resolve: (deps: Args): Simplify<Returns> =>
      Object.fromEntries(
        Object.entries(fns).map(([key, fn]) => [
          key,
          // @ts-expect-error - Error due to mismatch between Args index signature type and string key type,
          // but ignored due to heavy use of type hacks.
          fn({ ...(defaultDeps[key] ?? {}), ...(deps[key] ?? {}) }),
        ]),
      ) as any,
  }
}

/**
 * Creates a dependency resolver that resolves dependencies using the provided single function.
 * @param usecase
 * @param defaultDeps
 * @returns
 */
export function createSingleDepsResolver<
  Fn extends (deps: any) => any,
  DefaultDeps extends Partial<Parameters<Fn>[0]> | Internal_OptionalValueIsNotSet,
>(usecase: Fn, defaultDeps?: DefaultDeps) {
  const { resolve, defaultDeps: defaultDeps2 } = createDepsResolver(
    {
      usecase,
    },
    {
      usecase: (defaultDeps ?? {}) as Internal_OptionalValueIsNotSet extends DefaultDeps
        ? {}
        : DefaultDeps,
    },
  )

  return {
    // FIXME: Fix the type error
    // @ts-expect-error - Error due to mismatch between Args index signature type and string key type,
    resolve: (deps: Parameters<typeof resolve>[0]['usecase']) => resolve({ usecase: deps }).usecase,
    defaultDeps: defaultDeps2.usecase,
  }
}
