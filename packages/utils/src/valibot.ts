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
