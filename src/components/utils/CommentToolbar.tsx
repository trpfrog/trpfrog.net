'use client'

import { VercelToolbar } from '@vercel/toolbar/next'

import { useShowSiteComments } from '@/states/showSiteComments'

export function CommentToolbar() {
  const [showSiteComments] = useShowSiteComments()
  return showSiteComments ? <VercelToolbar /> : null
}
