import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BlogPost } from '@trpfrog.net/posts'
import { formatReadTime } from '@trpfrog.net/posts/time'

import { PlainBlock } from '@/components/atoms/PlainBlock'
import { BlockLink } from '@/components/molecules/BlockLink'

import { DEFAULT_BLOG_THUMBNAIL } from '@/lib/constants'
import { formatDateToDisplay } from '@/lib/date'

import styles from './index.module.scss'

type LiteArticleCardProps = {
  entry: BlogPost
}

export function LiteArticleCard({ entry }: LiteArticleCardProps) {
  const tags = entry.tags.map(tag => `#${tag.trim()}`)
  const hasThumbnail = !!entry.thumbnail
  const { minutes: readTimeMinutes } = formatReadTime(entry.readTime)

  return (
    <PlainBlock className={styles.wrapper}>
      <BlockLink href={'/blog/' + entry.slug} prefetch={false} className={styles.layout}>
        {hasThumbnail ? (
          <img
            className={styles.image}
            src={entry.thumbnail ?? DEFAULT_BLOG_THUMBNAIL}
            alt={entry.title}
          />
        ) : (
          <div className={styles.no_thumbnail}>
            <span>
              <FontAwesomeIcon icon={faPencil} />
            </span>
          </div>
        )}

        <div className={styles.contents}>
          <div className={styles.title}>{entry.title}</div>
          {hasThumbnail && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className={styles.description}>
            <strong>{formatDateToDisplay(entry.date)}</strong>
            {'・'}
            {entry.description}
          </div>
          {hasThumbnail && (
            <div className={styles.description}>
              {[
                `${readTimeMinutes} 分`,
                entry.numberOfPhotos && `${entry.numberOfPhotos} 枚の写真`,
                entry.updated && `${formatDateToDisplay(entry.updated)} 更新`,
              ]
                .filter(Boolean)
                .join(' ・ ')}
            </div>
          )}
        </div>
      </BlockLink>
    </PlainBlock>
  )
}
