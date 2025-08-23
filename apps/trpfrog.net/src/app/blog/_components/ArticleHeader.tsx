import * as React from 'react'

import { BlogPost } from '@trpfrog.net/posts'
import classNames from 'classnames'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'

import { ParseWithBudouX } from '@/lib/wordSplit'

import { EditButton } from '@blog/_components/EditButton'
import { EntryButtons } from '@blog/_components/EntryButtons'
import { PostAttributes } from '@blog/_components/PostAttributes'
import { Tag } from '@blog/_components/Tag'

import type { Except } from 'type-fest'

type Props = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  post: BlogPost
  addEntryButtons?: boolean
  addEditButtonOnDevMode?: boolean
}

export const ArticleHeader = React.memo(function ArticleHeader(props: Props) {
  const { post, addEntryButtons = true, addEditButtonOnDevMode = true } = props

  const tags = post.tags
  const title = post.title?.endsWith('！')
    ? post.title.slice(0, post.title.length - 1) + ' !'
    : post.title

  return (
    <PhotoBgTitleBlock thumbnail={post.thumbnail}>
      <ArticleTitle title={title} />
      {post.description && <ArticleDescription description={post.description} />}
      <PostAttributes post={post} />
      <ArticleTags tags={tags} />
      {addEditButtonOnDevMode && process.env.NODE_ENV === 'development' && (
        <DevButtons slug={post.slug} />
      )}
      {addEntryButtons && <EntryButtons post={post} style={{ margin: 0 }} />}
    </PhotoBgTitleBlock>
  )
})

function PhotoBgTitleBlock(props: { thumbnail?: string; children?: React.ReactNode }) {
  return (
    <Block
      className="tw-border-4 tw-border-window-color tw-overflow-hidden tw-bg-cover"
      style={{
        padding: '0',
        backgroundImage: props.thumbnail ? `url(${props.thumbnail})` : undefined,
      }}
      data-with-thumbnail={!!props.thumbnail}
    >
      <div
        data-parent-has-thumbnail={!!props.thumbnail}
        className={classNames(
          'tw-box-border tw-size-full tw-p-8 sp:tw-px-2',
          'tw-bg-[linear-gradient(166deg,var(--window-bkg-color)_50%,transparent)]',
        )}
      >
        {props.children}
      </div>
    </Block>
  )
}

function ArticleTitle(props: { title: string }) {
  return (
    <h1
      className={classNames(
        'tw-font-mplus-rounded tw-font-black tw-text-center',
        'tw-text-4xl sp:tw-text-3xl tw-my-4 tw-leading-tight tw-tracking-tight',
      )}
    >
      <Balancer>
        <ParseWithBudouX str={props.title} />
      </Balancer>
    </h1>
  )
}

function ArticleDescription(props: { description: string }) {
  return (
    <p className="tw-text-center tw-text-lg tw-my-6 tw-mx-3 tw-leading-normal">
      <Balancer>
        <ParseWithBudouX str={props.description} />
      </Balancer>
    </p>
  )
}

function ArticleTags(props: { tags: string[] }) {
  return (
    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center tw-m-4">
      {props.tags.map((tag: string) => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  )
}

function DevButtons(props: { slug: string }) {
  return (
    <div className="tw-my-4 tw-flex tw-justify-center tw-gap-2">
      <EditButton slug={props.slug} />
      <RichButton as={Link} href={`/blog/${props.slug}/og-image`}>
        OG Image
      </RichButton>
    </div>
  )
}
