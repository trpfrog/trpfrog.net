import * as React from 'react'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'

import { Button } from '@/components/atoms/Button'
import { A } from '@/components/wrappers'

import { EntryButton } from '@blog/_components/EntryButton'
import { TogglePageViewLink } from '@blog/_components/TogglePageViewLink'
import { UDFontButton } from '@blog/_components/UDFontBlock'
import { BlogPost } from '@blog/_lib/blogPost'

import { ShareSpan } from './ShareSpan'

type EntryButtonProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  post: BlogPost
  extended?: boolean
}

export function RichEntryButtons(props: EntryButtonProps) {
  const { post, extended, ...rest } = props
  return (
    <div {...rest} style={{ display: 'flex' }}>
      <A href={'/blog'}>
        <EntryButton icon={faArrowLeft} text={'記事一覧'} />
      </A>
      <ShareSpan slug={post.slug}>
        <EntryButton icon={faTwitter} text={'ツイート'} />
      </ShareSpan>
      <A href={'https://github.com/TrpFrog/trpfrog.net/issues'}>
        <EntryButton icon={faPencil} text={'訂正依頼'} />
      </A>
      {extended && (
        <>
          <UDFontButton />
          {post.numberOfPages >= 2 && <TogglePageViewLink post={post} />}
        </>
      )}
    </div>
  )
}

export function EntryButtons({ post, style, ...rest }: EntryButtonProps) {
  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '8px 6px',
        ...style,
      }}
      {...rest}
    >
      <Button href={'/blog'}>記事一覧</Button>
      <ShareSpan slug={post.slug}>
        <Button>ツイート</Button>
      </ShareSpan>
      <Button
        externalLink={true}
        href={'https://github.com/TrpFrog/trpfrog.net/issues'}
      >
        訂正リクエスト
      </Button>
    </div>
  )
}
