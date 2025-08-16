import * as v from 'valibot'

export const StringifiedBooleanSchema = v.optional(
  v.pipe(
    v.picklist(['true', 'false']),
    v.transform(v => v === 'true'),
  ),
  'false',
)

export const vCoerceNumber = v.union([
  v.number(),
  v.pipe(
    v.string(),
    v.transform(str => parseInt(str, 10)),
    v.number(),
  ),
])

export const vCoerceDate = v.union([
  v.date(),
  v.pipe(
    v.union([v.string(), v.number()]),
    v.transform(str => new Date(str)),
  ),
])

/**
 * Narrows the input type of a valibot schema to a specific type `T`.
 *
 * This utility is useful when you want to enforce a particular input type for a schema,
 * especially in cases where the schema accepts a wide range of input types but you want
 * to restrict or clarify the expected input for type safety or documentation purposes.
 *
 * @template T - The desired input type for the schema.
 * @param schema - The valibot schema to narrow.
 * @returns A new schema that expects input of type `T`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 型パズルの都合で any を使う
export function vNarrowInputType<T>(schema: v.BaseSchema<any, any, any>) {
  return v.pipe(
    v.custom<T>(() => true),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 型パズルの都合で any を使う
    v.transform<any, any>(s => s),
    schema,
  )
}
