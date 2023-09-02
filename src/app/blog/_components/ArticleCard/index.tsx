import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import React from 'react'
import { getPureCloudinaryPath } from '@blog/_lib/getPureCloudinaryPath'
import BlogPost from '@blog/_lib/blogPost'
import CldImageWrapper from '@/components/utils/CldImageWrapper'
import BlockLink from '@/components/BlockLink'
import TagBar from '@blog/_components/ArticleCard/TagBar'
import ArticleTitle from '@blog/_components/ArticleCard/ArticleTitle'
import Card from '@blog/_components/ArticleCard/Card'
import ArticleCardGrid, {
  gridArea,
} from '@blog/_components/ArticleCard/ArticleCardGrid'

type Props = {
  entry: BlogPost
  hero?: boolean
  style?: React.CSSProperties
}

const ArticleCard = ({ entry, hero = false, style }: Props) => {
  const articlePath = '/blog/' + entry.slug
  const thumbnail = getPureCloudinaryPath(entry.thumbnail ?? '/TwitterCard')

  return (
    <Card isHero={hero} style={style}>
      <BlockLink href={articlePath} prefetch={false}>
        <ArticleCardGrid isHero={hero}>
          <TagBar
            tags={entry.tags.split(',').map((t: string) => t.trim())}
            style={{ gridArea: gridArea.tags }}
          />
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

export default ArticleCard
