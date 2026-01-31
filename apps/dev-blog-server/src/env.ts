import { validateUnknown } from '@trpfrog.net/utils'
import * as v from 'valibot'

export const env = validateUnknown(
  v.object({
    CLOUDINARY_CLOUD_NAME: v.pipe(v.string(), v.nonEmpty()),
    CLOUDINARY_API_KEY: v.pipe(v.string(), v.nonEmpty()),
    CLOUDINARY_API_SECRET: v.pipe(v.string(), v.nonEmpty()),
    OPENAI_API_KEY: v.pipe(v.string(), v.nonEmpty()),
  }),
  // oxlint-disable-next-line eslint-n/no-process-env
  process.env,
)
