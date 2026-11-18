'use client'

import * as React from 'react'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'
import type { Except } from 'type-fest'

import { BlogPost } from '@trpfrog.net/posts'

import { RichButton } from '@/components/atoms/RichButton'
import { useShareTweetURL } from '@/hooks/useShareTweetURL'
import { EntryButton } from '@blog/_components/EntryButton'
import { TogglePageViewLink } from '@blog/_components/TogglePageViewLink'

type EntryButtonProps = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  post: BlogPost
  extended?: boolean
}

export function RichEntryButtons(props: EntryButtonProps) {
  const { post, extended, ...rest } = props
  const tweetURL = useShareTweetURL(`/blog/${post.slug}`)
  return (
    <div {...rest} style={{ display: 'flex' }}>
      <EntryButton href="/blog" icon={faArrowLeft} text="記事一覧" />
      <EntryButton href={tweetURL} openInNewTab icon={faTwitter} text="ツイート" />
      <EntryButton
        href="https://github.com/TrpFrog/trpfrog.net/issues"
        icon={faPencil}
        text="訂正依頼"
      />
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
      <RichButton href="/blog">記事一覧</RichButton>
      <RichButton href={tweetURL} openInNewTab>
        ツイート
      </RichButton>
      <RichButton href="https://github.com/TrpFrog/trpfrog.net/issues">訂正リクエスト</RichButton>
    </div>
  )
}
