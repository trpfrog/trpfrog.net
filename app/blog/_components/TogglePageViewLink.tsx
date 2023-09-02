'use client'

import { faFileLines, faToiletPaper } from '@fortawesome/free-solid-svg-icons'
import EntryButton from './EntryButton'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { usePathname } from 'next/navigation'
import BlogPost from '@blog/_lib/blogPost'

export default function TogglePageViewLink({ post }: { post: BlogPost }) {
  const pathname = usePathname() ?? ''
  const anchor = pathname.split('#').slice(-1)[0]

  let previousArticlePage = NaN
  const originalPageAnchor = 'original-page-'
  if (anchor.startsWith(originalPageAnchor)) {
    previousArticlePage = parseInt(anchor.replace(originalPageAnchor, ''), 10)
  }

  let url = `/blog/${post.slug}`
  let text: string
  let icon: IconProp | string

  if (post.isAll) {
    url += '/' + (previousArticlePage || '')
    text = '分割表示'
    icon = faFileLines
  } else {
    url +=
      post.currentPage === 1 ? '/all' : '/all#original-page-' + post.currentPage
    icon = faToiletPaper
    text = '全文表示'
  }

  return (
    <a href={url}>
      <EntryButton icon={icon} text={text} />
    </a>
  )
}
