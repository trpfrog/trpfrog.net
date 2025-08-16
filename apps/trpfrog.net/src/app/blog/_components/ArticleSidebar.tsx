'use client'

import { BLOG_PAGE_NUMBER__1, BlogPageNumberSchema, BlogPost } from '@trpfrog.net/posts'
import { tryOr, validateUnknown } from '@trpfrog.net/utils'
import { usePathname } from 'next/navigation'

import { Block } from '@/components/molecules/Block'
import { StickToTop } from '@/components/organisms/Header'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { PageNavigation } from '@blog/_components/PageNavigation'

import { RichEntryButtons } from './EntryButtons'

type Props = {
  post: BlogPost
}

function usePageNumberFromPathname() {
  const p = usePathname()
  return p.split('/').pop()
}

export function ArticleSidebar({ post }: Props) {
  // ページ番号を反映させるためだけに fetch すると時間がかかるのでパスから取得する
  const rawPageNumber = usePageNumberFromPathname()
  const currentPage = tryOr(
    () => validateUnknown(BlogPageNumberSchema, rawPageNumber),
    BLOG_PAGE_NUMBER__1,
  )

  const postForPageNavigation = {
    ...post,
    currentPage,
  }

  return (
    <StickToTop top={'1em'}>
      <ArticleCard
        entry={post}
        style={{
          pointerEvents: 'none',
          marginBottom: '1em',
        }}
      />
      <Block className="tw-h-fit tw-sticky tw-top-4" style={{ padding: '1.5em 0.5em' }}>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'top' }}>
          <RichEntryButtons post={post} extended={false} />
          <div style={{ height: '1em' }} />
          <PageNavigation entry={postForPageNavigation} />
        </div>
      </Block>
    </StickToTop>
  )
}
