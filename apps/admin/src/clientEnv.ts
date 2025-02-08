import * as v from 'valibot'

export const clientEnv = v.parse(
  v.object({
    NODE_ENV: v.picklist(['development', 'production', 'test']),
  }),
  {
    // eslint-disable-next-line n/no-process-env
    NODE_ENV: process.env.NODE_ENV,
  },
)
