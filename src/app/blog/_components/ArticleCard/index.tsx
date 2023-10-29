import React from 'react'

import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'

import { BlockLink } from '@/components/molecules/BlockLink'
import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import {
  gridArea,
  ArticleCardGrid,
} from '@blog/_components/ArticleCard/ArticleCardGrid'
import { ArticleTitle } from '@blog/_components/ArticleCard/ArticleTitle'
import { Card } from '@blog/_components/ArticleCard/Card'
import { TagBar } from '@blog/_components/ArticleCard/TagBar'
import { BlogPost } from '@blog/_lib/blogPost'
import { getPureCloudinaryPath } from '@blog/_lib/cloudinaryUtils'

import styles from './index.module.scss'

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
      <BlockLink href={articlePath} prefetch={false}>
        <ArticleCardGrid isHero={hero}>
          <TagBar tags={entry.tags} style={{ gridArea: gridArea.tags }} />
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
          <ArticleTitle
            title={entry.title}
            isHero={hero}
            style={{ gridArea: gridArea.title }}
          />
          <div
            className={styles.information}
            style={{ gridArea: gridArea.info }}
          >
            <FontAwesomeIcon icon={faCalendarDay} style={{ margin: 'auto' }} />{' '}
            {dayjs(entry.date).format('YYYY-MM-DD')} <br />
            <FontAwesomeIcon icon={faClock} style={{ margin: 'auto' }} />{' '}
            {Math.ceil(entry.readTime / 60)} min to read
          </div>
        </ArticleCardGrid>
      </BlockLink>
    </Card>
  )
}
