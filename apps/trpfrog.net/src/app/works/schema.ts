import { z } from 'zod'

export const WorksFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  h2icon: z.string().optional(),
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
