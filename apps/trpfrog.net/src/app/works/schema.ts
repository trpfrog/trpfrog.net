import { InferSchemaOutput } from '@trpfrog.net/utils'
import { vCoerceDate } from '@trpfrog.net/utils/valibot'
import * as v from 'valibot'

import { H2IconSchema } from '@/components/wrappers/H2'

export const WorksFrontmatterSchema = v.object({
  title: v.string(),
  subtitle: v.optional(v.string()),
  h2icon: v.optional(H2IconSchema, 'trpfrog'),
  image: v.optional(
    v.object({
      path: v.string(),
      width: v.number(),
      height: v.number(),
    }),
  ),
  keywords: v.optional(v.array(v.string())),
  links: v.optional(v.record(v.string(), v.string())),
  date: vCoerceDate,
})

export type WorksFrontmatter = InferSchemaOutput<typeof WorksFrontmatterSchema>
