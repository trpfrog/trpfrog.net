import { vCoerceDate } from '@trpfrog.net/utils/valibot'
import * as v from 'valibot'

export const WorksFrontmatterSchema = v.object({
  title: v.string(),
  description: v.string(),
  image: v.object({
    src: v.string(),
    alt: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
  }),
  links: v.array(
    v.object({
      href: v.string(),
      text: v.string(),
    }),
  ),
  date: vCoerceDate,
})
