/* eslint-disable @typescript-eslint/no-explicit-any -- Allow `any` for creating utility types */

/**
 * Defines the type for a "key" that can be used as an argument for the `PickDependencies` utility.
 *
 * - A key can be specified directly from the `RequiredDependencies` object.
 * - Alternatively, a function can be provided where the first argument is the `RequiredDependencies` object.
 *
 * This type exists specifically to support the `PickDependencies` utility.
 *
 * @template RequiredDependencies - The object containing the required dependencies.
 */
export type PickDependenciesKey<RequiredDependencies extends object> =
  | keyof RequiredDependencies
  | ((deps: RequiredDependencies, ...args: any[]) => any)

/**
 * Selects dependencies from the `RequiredDependencies` object based on the provided key or function.
 *
 * - You can directly specify a key from the `RequiredDependencies` object.
 * - Alternatively, you can provide a function where the first argument is the `RequiredDependencies` object.
 *
 * @template RequiredDependencies - The object containing the required dependencies.
 * @template T - The key or function used to determine which dependencies to pick.
 */
export type PickDependencies<
  RequiredDependencies extends object,
  T extends PickDependenciesKey<RequiredDependencies>,
> = Pick<
  RequiredDependencies,
  T extends infer U
    ? U extends keyof RequiredDependencies
      ? U
      : U extends (deps: RequiredDependencies, ...args: any[]) => any
        ? keyof Parameters<U>[0]
        : never
    : never
>
