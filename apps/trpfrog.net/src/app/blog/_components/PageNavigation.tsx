'use client'

import { useCallback } from 'react'

import { BlogPost } from '@trpfrog.net/posts'

import { NODE_ENV } from '@/env/client'

import { PageNavigation as SharedPageNavigation } from '@/components/organisms/PageNavigation'

type Props = {
  entry: BlogPost
  doNotShowOnFirst?: boolean
}

export const PageNavigation = ({ entry, doNotShowOnFirst = false }: Props) => {
  const createPath = useCallback(
    (pageNo: number) => {
      let href = entry.previewContentId
        ? `/blog/preview/${entry.previewContentId}/${pageNo}`
        : `/blog/${entry.slug}/${pageNo}`

      if (NODE_ENV === 'production') {
        href += '#article'
      }

      return href
    },
    [entry.previewContentId, entry.slug],
  )

  const isHidden =
    entry.numberOfPages === 1 ||
    (doNotShowOnFirst && entry.currentPage <= 1 && NODE_ENV === 'production')

  if (isHidden) {
    return null
  }

  return (
    <SharedPageNavigation
      currentPage={entry.currentPage}
      lastPage={entry.numberOfPages}
      createPath={createPath}
      showNextPrevButtons
    />
  )
}
