/* eslint-disable @typescript-eslint/no-explicit-any -- Allow `any` for creating utility types */

// Prettify type to make the type more readable
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Internal_OptionalValueIsNotSet = '__internal_optionalValueIsNotSet__'

/**
 * Creates a dependency resolver that resolves dependencies using the provided functions.
 * @param fns
 * @param defaultDeps
 * @returns
 */
export function createDepsResolver<
  Fns extends Record<string, (deps: any) => any>,
  DefaultDeps extends Partial<{ [K in keyof Fns]: Partial<Parameters<Fns[K]>[0]> }>,
>(fns: Fns, defaultDeps?: DefaultDeps) {
  defaultDeps = defaultDeps ?? ({} as DefaultDeps)
  type AllDeps = { [K in keyof Fns]: Parameters<Fns[K]>[0] }

  // prettier-ignore
  type Args = {
    [K in keyof Fns]: Prettify<
      // Requires all keys from Fns[K] except those in DefaultDeps[K]
      Omit<AllDeps[K], keyof DefaultDeps[K]>
      // Allows all keys from DefaultDeps[K] to be optional
      & Partial<Pick<AllDeps[K], keyof DefaultDeps[K]>>
    >
  }
  type Returns = { [K in keyof Fns]: ReturnType<Fns[K]> }

  return {
    defaultDeps,
    // TODO: Consider using Proxy to improve performance by lazily resolving the dependencies
    resolve: (deps: Args): Prettify<Returns> =>
      Object.fromEntries(
        Object.entries(fns).map(([key, fn]) => [
          key,
          fn({ ...(defaultDeps[key] ?? {}), ...deps[key] }),
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
        ? // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
        : DefaultDeps,
    },
  )
  return {
    resolve: (deps: Parameters<typeof resolve>[0]['usecase']) => resolve({ usecase: deps }).usecase,
    defaultDeps: defaultDeps2.usecase,
  }
}
