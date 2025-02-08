import * as v from 'valibot'

export const StringifiedBooleanSchema = v.pipe(
  v.picklist(['true', 'false']),
  v.transform(v => v === 'true'),
)

export const vCoerceNumber = v.union([
  v.number(),
  v.pipe(
    v.string(),
    v.transform(str => parseInt(str, 10)),
    v.number(),
  ),
])
