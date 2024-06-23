import * as React from 'react'

import { BlogPost } from '@trpfrog.net/posts'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { env } from '@/env/server'

import { RichButton } from '@/components/atoms/RichButton'
import { Title } from '@/components/organisms/Title'

import { ParseWithBudouX } from '@/lib/wordSplit'

import { EditButton } from '@blog/[slug]/[[...options]]/_components/EditButton'
import { EntryButtons } from '@blog/[slug]/[[...options]]/_components/EntryButtons'
import { PostAttributes } from '@blog/_components/PostAttributes'
import { Tag } from '@blog/_components/Tag'

import styles from './index.module.scss'

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  post: BlogPost
  addEntryButtons?: boolean
  addEditButtonOnDevMode?: boolean
}

export const ArticleHeader = React.memo(function ArticleHeader(props: Props) {
  const {
    post,
    addEntryButtons = true,
    addEditButtonOnDevMode = true,
    className = '',
    style = {},
    ...rest
  } = props

  const tags = post.tags
  const title = post.title?.endsWith('！')
    ? post.title.slice(0, post.title.length - 1) + ' !'
    : post.title

  return (
    <>
      <Title
        className={`${styles.article_title_block} ${className}`}
        style={{
          backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined,
          ...style,
        }}
        {...rest}
      >
        <div className={styles.inner_title_block} data-parent-has-thumbnail={!!post.thumbnail}>
          <h1>
            <Balancer>
              <ParseWithBudouX str={title} slug={post.slug} />
            </Balancer>
          </h1>
          {post.description && (
            <p className="tw-text-center tw-text-lg tw-m-2 tw-leading-normal">
              <Balancer>
                <ParseWithBudouX str={post.description} slug={post.slug} />
              </Balancer>
            </p>
          )}
          <PostAttributes post={post} />

          {/* Tags */}
          <div className="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center tw-m-4">
            {tags.map((tag: string) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          {addEditButtonOnDevMode && env.NODE_ENV === 'development' && (
            <div className="tw-my-4 tw-flex tw-justify-center tw-gap-2">
              <EditButton slug={post.slug} />
              <RichButton as={Link} href={`/blog/${post.slug}/og-image`}>
                OG Image
              </RichButton>
            </div>
          )}
        </div>
      </Title>
      {addEntryButtons && <EntryButtons post={post} style={{ margin: 0 }} />}
    </>
  )
})
