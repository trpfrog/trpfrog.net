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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function vNarrowInputType<T>(schema: v.BaseSchema<any, any, any>) {
  return v.pipe(
    v.custom<T>(() => true),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    v.transform<any, any>(s => s),
    schema,
  )
}
