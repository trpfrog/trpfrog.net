'use server'

import { readMarkdownFromSlug } from '@blog/_lib/load'

export async function loadMarkdownFromServer(slug: string) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }
  return readMarkdownFromSlug(slug)
}
