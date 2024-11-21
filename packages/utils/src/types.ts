/* eslint-disable @typescript-eslint/no-explicit-any -- Allow `any` for creating utility types */

/**
 * Defines the type for a "key" that can be used as an argument for the `PickDependencies` utility.
 *
 * - A key can be specified directly from the `RequiredDependencies` object.
 * - Alternatively, a function can be provided where the first argument is the `RequiredDependencies` object.
 *
 * This type exists specifically to support the `PickDependencies` utility.
 *
 * @template D - The object containing the required dependencies.
 */
export type DependencyRef<D extends object> = keyof D | ((deps: D, ...args: any[]) => any)

/**
 * Resolves the key from the `RequiredDependencies` object based on the provided key or function.
 *
 * - If the provided key is a direct key from the `RequiredDependencies` object, it is returned as-is.
 * - If the provided key is a function, the first argument is used to determine the key.
 */
export type ResolveDependencyRef<D extends object, T extends DependencyRef<D>> = T extends infer U
  ? U extends keyof D
    ? U
    : U extends (deps: D, ...args: any[]) => any
      ? keyof Parameters<U>[0]
      : never
  : never

/**
 * Selects dependencies from the `RequiredDependencies` object based on the provided key or function.
 *
 * - You can directly specify a key from the `RequiredDependencies` object.
 * - Alternatively, you can provide a function where the first argument is the `RequiredDependencies` object.
 *
 * @template D - The object containing the required dependencies.
 * @template T - The key or function used to determine which dependencies to pick.
 */
export type PickDependencies<D extends object, T extends DependencyRef<D>> = Pick<
  D,
  ResolveDependencyRef<D, T>
>
