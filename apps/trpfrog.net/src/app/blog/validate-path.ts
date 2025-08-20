import { BlogPageNumber, BlogPageNumberSchema } from '@trpfrog.net/posts'
import { InferSchemaInput, safeValidate } from '@trpfrog.net/utils'
import { notFound } from 'next/navigation'

type ValidatedBlogPath = {
  slug: string
  page: BlogPageNumber
}

export function validateBlogPath(
  rawSlug?: string,
  rawPage?: InferSchemaInput<typeof BlogPageNumberSchema>,
): ValidatedBlogPath {
  const validatedBlogPageNumber = safeValidate(BlogPageNumberSchema, rawPage ?? '1')
  if (!rawSlug || !validatedBlogPageNumber.success) {
    notFound()
  }
  return { slug: rawSlug, page: validatedBlogPageNumber.output }
}
