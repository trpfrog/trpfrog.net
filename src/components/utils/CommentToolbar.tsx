'use client'

import { VercelToolbar } from '@vercel/toolbar/next'

import { useShowSiteCommentsAtom } from '@/states/showSiteCommentsAtom'

export function CommentToolbar() {
  const [showSiteComments] = useShowSiteCommentsAtom()
  return showSiteComments ? <VercelToolbar /> : null
}
