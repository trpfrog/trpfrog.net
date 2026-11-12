import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

/** RFC 9457 Problem Details */
export type Problem = {
  type: string
  title: string
  status: number
  detail: string
  code: string
  resolution?: string
}

const DOCS_URL = 'https://trpfrog.net/docs/api'

export function problem(
  c: Context,
  status: ContentfulStatusCode,
  { code, title, detail, resolution }: Omit<Problem, 'type' | 'status'>,
) {
  const body: Problem = { type: `${DOCS_URL}#${code}`, title, status, detail, code, resolution }
  return c.json(body, status, { 'Content-Type': 'application/problem+json' })
}
