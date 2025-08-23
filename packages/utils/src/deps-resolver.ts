/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any -- Allow `any` for creating utility types */

import type { Except } from 'type-fest'

// Prettify type to make the type more readable
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type PartialSelectedKeys<T, K extends keyof T> = Prettify<Except<T, K> & Partial<Pick<T, K>>>

type PartialIfAllChildrenAreOptional<T extends Record<string, Record<string, unknown>>> =
  PartialSelectedKeys<
    T,
    keyof {
      // FIXME: なんか条件式に T[K] が含まれているとエラーになる
      [K in keyof T as Partial<T[K]> extends T[K] ? K : never]: null
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
  Args extends Prettify<
    PartialIfAllChildrenAreOptional<{
      [K in keyof DepsDict]:
        // Requires all keys from Fns[K] except those in DefaultDeps[K]
        Except<DepsDict[K], keyof DefaultDeps[K]> &
        // Allows all keys from DefaultDeps[K] to be optional
        Partial<Pick<DepsDict[K], keyof DefaultDeps[K]>>
    }>
  >,
  Returns extends Prettify<{ [K in keyof Fns]: ReturnType<Fns[K]> }>,
>(fns: Fns, defaultDeps?: DefaultDeps) {
  defaultDeps = defaultDeps ?? ({} as DefaultDeps)

  return {
    defaultDeps,
    // TODO: Consider using Proxy to improve performance by lazily resolving the dependencies
    resolve: (deps: Args): Prettify<Returns> =>
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
