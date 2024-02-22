import { z } from 'zod'

export const WorksFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string().optional(),
    width: z.number(),
    height: z.number(),
  }),
  links: z.array(
    z.object({
      href: z.string(),
      text: z.string(),
    }),
  ),
  date: z.coerce.date(),
})

export type WorksFrontmatter = z.infer<typeof WorksFrontmatterSchema>
