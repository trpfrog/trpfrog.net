import React from 'react'

import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BlogPost } from '@trpfrog.net/posts'
import { formatReadTime } from '@trpfrog.net/posts/time'
import Link from 'next/link'

import { PlainBlock } from '@/components/atoms/PlainBlock'

import { DEFAULT_BLOG_THUMBNAIL } from '@/lib/constants'
import { formatDateToDisplay } from '@/lib/date'
import { tv } from '@/lib/tailwind/variants'

const thumbnailStyle = tv({
  base: 'tw:w-28 tw:object-cover tw:rounded-[10px]',
  variants: {
    noThumbnail: {
      true: [
        'tw:bg-(--header-color) tw-color-[--body-background]',
        'tw:grid tw:place-items-center tw:text-2xl',
      ],
    },
  },
})

function Thumbnail(props: { thumbnail?: string; title: string }) {
  return props.thumbnail ? (
    <img className={thumbnailStyle()} src={props.thumbnail ?? DEFAULT_BLOG_THUMBNAIL} />
  ) : (
    <div className={thumbnailStyle({ noThumbnail: true })}>
      <span>
        <FontAwesomeIcon icon={faPencil} />
      </span>
    </div>
  )
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="tw:flex tw:flex-row tw:gap-1 tw:items-end">
      {tags.map(tag => (
        <span
          className="tw-text-sm tw-px-2 tw-py-1 tw-rounded-full tw-border-2
            tw-border-[--body-background]"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function Descriptions(props: {
  date: string
  description?: string
  readTime: number
  numberOfPhotos?: number
  updated?: string
}) {
  const { minutes: readTimeMinutes } = formatReadTime(props.readTime)

  return (
    <>
      <div className="tw:leading-[1.1] tw:text-sm tw:opacity-70">
        <strong>{formatDateToDisplay(props.date)}</strong>
        {props.description && ' ・ ' + props.description}
      </div>

      <div className="tw:leading-[1.1] tw:text-sm tw:opacity-70">
        {[
          `${readTimeMinutes} 分`,
          props.numberOfPhotos && `${props.numberOfPhotos} 枚の写真`,
          props.updated && `${formatDateToDisplay(props.updated)} 更新`,
        ]
          .filter(Boolean)
          .join(' ・ ')}
      </div>
    </>
  )
}

type LiteArticleCardProps = {
  entry: BlogPost
}

export function LiteArticleCard({ entry }: LiteArticleCardProps) {
  const tags = entry.tags.map(tag => `#${tag.trim()}`)

  return (
    <Link
      href={'/blog/' + entry.slug}
      prefetch={false}
      className="tw-rounded-[20px] tw-line-height[1] hover:tw-cursor-pointer
        hover:tw-shadow-[0_8px_0_var(--window-bottom-color)] hover:tw-translate-y-[-2px]
        active:tw-translate-y-[6px] active:tw-shadow-none focus-visible:tw-outline-[--header-color]"
    >
      <PlainBlock className="tw:flex tw:flex-row tw:gap-2.5 tw:p-2.5">
        <Thumbnail thumbnail={entry.thumbnail} title={entry.title} />
        <div className="tw:flex-1 tw:flex tw:flex-col tw:gap-1.75">
          <div className="tw:text-lg tw:font-bold tw:font-mplus-rounded tw:sp:text-base">
            {entry.title}
          </div>
          {entry.thumbnail && <TagList tags={tags} />}
          <Descriptions
            date={entry.date}
            description={entry.description}
            readTime={entry.readTime}
            numberOfPhotos={entry.numberOfPhotos}
            updated={entry.updated}
          />
        </div>
      </PlainBlock>
    </Link>
  )
}
