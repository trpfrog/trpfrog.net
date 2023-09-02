import Link from 'next/link'
import EntryButton from '@/app/blog/_components/EntryButton'
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'
import ShareSpan from './ShareSpan'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { UDFontButton } from '@/app/blog/_components/UDFontBlock'
import TogglePageViewLink from '@/app/blog/_components/TogglePageViewLink'
import React from 'react'
import BlogPost from '@/app/blog/_lib/blogPost'

type EntryButtonProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  post: BlogPost
  extended?: boolean
}

export function RichEntryButtons(props: EntryButtonProps) {
  const { post, extended, ...rest } = props
  return (
    <div {...rest}>
      <Link href={'/blog'}>
        <EntryButton icon={faArrowLeft} text={'記事一覧'} />
      </Link>
      <ShareSpan slug={post.slug}>
        <EntryButton icon={faTwitter} text={'ツイート'} />
      </ShareSpan>
      <a href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
        <EntryButton icon={faPencil} text={'訂正依頼'} />
      </a>
      {extended && (
        <>
          <UDFontButton />
          {post.numberOfPages >= 2 && <TogglePageViewLink post={post} />}
        </>
      )}
    </div>
  )
}

export function EntryButtons({
  post,
  className,
  style,
  ...rest
}: EntryButtonProps) {
  return (
    <p
      className={`link-area ${className}`}
      style={{ textAlign: 'center', ...style }}
      {...rest}
    >
      <Link href={'/blog'}>記事一覧</Link>
      <ShareSpan slug={post.slug}>
        <a>ツイート</a>
      </ShareSpan>
      <a href={'https://github.com/TrpFrog/next-trpfrog-net/issues'}>
        訂正リクエスト
      </a>
    </p>
  )
}
