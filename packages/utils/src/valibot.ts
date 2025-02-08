import * as v from 'valibot'

export const StringifiedBooleanSchema = v.pipe(
  v.picklist(['true', 'false']),
  v.transform(v => v === 'true'),
)
