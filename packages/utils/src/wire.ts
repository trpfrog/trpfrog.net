/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Represents an empty object type.
 */
export type EmptyObject = Partial<Record<'', never>>

/**
 * A builder for resolving dependencies using provided functions.
 *
 * @template TFuncs - An object where keys are dependency names and values are functions that resolve those dependencies.
 * @template TResolved - An object representing the currently resolved dependencies.
 */
export class DependencyBuilder<
  TFuncs extends Record<string, (deps: any) => any>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TResolved extends Partial<{ [K in keyof TFuncs]: ReturnType<TFuncs[K]> }> = {},
> {
  private funcs: TFuncs
  private resolved: TResolved

  /**
   * Creates an instance of DependencyBuilder.
   *
   * @param funcs - An object mapping dependency names to functions that resolve them.
   * @param resolved - (Optional) An object containing pre-resolved dependencies.
   */
  constructor(funcs: TFuncs, resolved: TResolved = {} as TResolved) {
    this.funcs = funcs
    this.resolved = resolved
  }

  /**
   * Internally injects new dependencies into the builder.
   *
   * @param deps - An object of dependencies or a function that returns such an object.
   * @param overwrite - A boolean indicating whether to overwrite existing dependencies.
   * @returns A new instance of DependencyBuilder with the injected dependencies.
   */
  private internalInject<NewDeps extends object>(
    deps: NewDeps | ((resolved: { [K in keyof TResolved]: TResolved[K] }) => NewDeps),
    overwrite: boolean,
  ) {
    const newDeps = typeof deps === 'function' ? deps(this.resolved) : deps

    const newResolved: Record<string, any> = {}

    for (const key in newDeps) {
      if (!overwrite && key in this.resolved) {
        throw new Error(`Dependency ${key} is already resolved`)
      }
      const func = this.funcs[key]
      const dep = newDeps[key]
      newResolved[key] = func(dep)
    }

    return new DependencyBuilder(this.funcs, {
      ...this.resolved,
      ...(newResolved as {
        [K in keyof NewDeps]: K extends keyof TFuncs ? ReturnType<TFuncs[K]> : never
      }),
    })
  }

  /**
   * Overwrites existing dependencies with new ones.
   *
   * @param deps - An object of dependencies or a function that returns such an object.
   * @returns A new instance of DependencyBuilder with the overwritten dependencies.
   */
  overwrite<
    NewDeps extends Partial<{
      [K in keyof TFuncs]: Parameters<TFuncs[K]>[0]
    }>,
  >(deps: NewDeps | ((resolved: { [K in keyof TResolved]: TResolved[K] }) => NewDeps)) {
    return this.internalInject<NewDeps>(deps, true)
  }

  /**
   * Injects new dependencies into the builder.
   *
   * @param deps - An object of dependencies or a function that returns such an object.
   * @returns A new instance of DependencyBuilder with the injected dependencies.
   */
  inject<
    NewDeps extends keyof TFuncs extends keyof TResolved
      ? EmptyObject
      : Partial<{
          [K in keyof TFuncs as K extends keyof TResolved ? never : K]: Parameters<TFuncs[K]>[0]
        }>,
  >(deps: NewDeps | ((resolved: { [K in keyof TResolved]: TResolved[K] }) => NewDeps)) {
    return this.internalInject<NewDeps>(deps, false)
  }

  /**
   * Builds and returns all resolved dependencies.
   *
   * @returns An object containing all resolved dependencies.
   * @throws If there are unresolved dependencies.
   */
  build(): keyof TFuncs extends keyof TResolved
    ? { [K in keyof TFuncs]: ReturnType<TFuncs[K]> }
    : never {
    const allKeys = Object.keys(this.funcs) as (keyof TFuncs)[]
    const unresolvedKeys = allKeys.filter(key => !(key in this.resolved))

    if (unresolvedKeys.length > 0) {
      throw new Error(
        `The following functions have unresolved dependencies: ${unresolvedKeys.join(', ')}`,
      )
    }

    return this.resolved as any
  }
}

/**
 * Initializes a DependencyBuilder with the provided functions.
 *
 * @param funcs - An object mapping dependency names to functions that resolve them.
 * @returns A new instance of DependencyBuilder.
 */
export function wire<T extends Record<string, (deps: any) => any>>(funcs: T) {
  return new DependencyBuilder(funcs)
}
