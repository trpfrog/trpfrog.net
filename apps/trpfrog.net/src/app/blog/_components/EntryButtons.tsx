'use client'

import * as React from 'react'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'
import { BlogPost } from '@trpfrog.net/posts'
import Link from 'next/link'

import { RichButton } from '@/components/atoms/RichButton'
import { A } from '@/components/wrappers'

import { useShareTweetURL } from '@/hooks/useShareTweetURL'

import { EntryButton } from '@blog/_components/EntryButton'
import { TogglePageViewLink } from '@blog/_components/TogglePageViewLink'

import type { Except } from 'type-fest'

type EntryButtonProps = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  post: BlogPost
  extended?: boolean
}

export function RichEntryButtons(props: EntryButtonProps) {
  const { post, extended, ...rest } = props
  const tweetURL = useShareTweetURL(`/blog/${post.slug}`)
  return (
    <div {...rest} style={{ display: 'flex' }}>
      <A href={'/blog'}>
        <EntryButton icon={faArrowLeft} text={'記事一覧'} />
      </A>
      <A href={tweetURL} openInNewTab>
        <EntryButton icon={faTwitter} text={'ツイート'} />
      </A>
      <A href={'https://github.com/TrpFrog/trpfrog.net/issues'}>
        <EntryButton icon={faPencil} text={'訂正依頼'} />
      </A>
      {extended && post.numberOfPages >= 2 && <TogglePageViewLink post={post} />}
    </div>
  )
}

export function EntryButtons({ post, style, ...rest }: EntryButtonProps) {
  const tweetURL = useShareTweetURL(`/blog/${post.slug}`)
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
      <RichButton as={Link} href={'/blog'}>
        記事一覧
      </RichButton>
      <A href={tweetURL} openInNewTab>
        <RichButton as="span">ツイート</RichButton>
      </A>
      <RichButton as={A} href={'https://github.com/TrpFrog/trpfrog.net/issues'}>
        訂正リクエスト
      </RichButton>
    </div>
  )
}
