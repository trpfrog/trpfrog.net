import * as React from 'react'

import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BlogPost } from '@trpfrog.net/posts'
import Link from 'next/link'

import { PlainBlock } from '@/components/atoms/PlainBlock'
import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import { getPureCloudinaryPath } from '@/lib/cloudinaryUtils'
import { formatDateToDisplay } from '@/lib/date'

import { gridArea, ArticleCardGrid } from '@blog/_components/ArticleCard/ArticleCardGrid'
import { ArticleTitle } from '@blog/_components/ArticleCard/ArticleTitle'
import { Card } from '@blog/_components/ArticleCard/Card'
import { TagBar } from '@blog/_components/ArticleCard/TagBar'

import styles from './index.module.css'

type Props = {
  entry: BlogPost
  hero?: boolean
  style?: React.CSSProperties
}

export const ArticleCard = ({ entry, hero = false, style }: Props) => {
  const articlePath = '/blog/' + entry.slug
  const thumbnail = getPureCloudinaryPath(entry.thumbnail ?? '/TwitterCard')

  return (
    <Card isHero={hero} style={style}>
      <Link href={articlePath} prefetch={false}>
        <PlainBlock>
          <ArticleCardGrid isHero={hero}>
            <TagBar tags={entry.tags} style={{ gridArea: gridArea.tags }} wrappedWithLink={false} />
            <div
              className={styles.thumbnail_wrapper}
              data-hero-article={hero}
              style={{ gridArea: gridArea.thumbnail }}
            >
              <CldImageWrapper
                src={thumbnail}
                alt={'thumbnail of ' + entry.slug}
                width={hero ? 1000 : 600}
                height={300}
                style={{ objectFit: 'cover' }}
                data-hero-article={hero}
                className={styles.thumbnail}
              />
            </div>
            <ArticleTitle title={entry.title} isHero={hero} style={{ gridArea: gridArea.title }} />
            <div className={styles.information} style={{ gridArea: gridArea.info }}>
              <FontAwesomeIcon icon={faCalendarDay} style={{ margin: 'auto' }} />{' '}
              {formatDateToDisplay(entry.date)} <br />
              <FontAwesomeIcon icon={faClock} style={{ margin: 'auto' }} />{' '}
              {Math.ceil(entry.readTime / 60)} min to read
            </div>
          </ArticleCardGrid>
        </PlainBlock>
      </Link>
    </Card>
  )
}
