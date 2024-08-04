import { z } from 'zod'

import { H2IconSchema } from '@/components/wrappers/H2'

export const WorksFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  h2icon: H2IconSchema.default('trpfrog'),
  image: z
    .object({
      path: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  keywords: z.array(z.string()).optional(),
  links: z.record(z.string()).optional(),
  date: z.coerce.date(),
})

export type WorksFrontmatter = z.infer<typeof WorksFrontmatterSchema>
