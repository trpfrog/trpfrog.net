import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import dayjs from "dayjs";
import Tag from "../Tag";
import {ParseWithBudouX} from "@/lib/wordSplit";
import React from "react";
import {getPureCloudinaryPath} from "@blog/lib/getPureCloudinaryPath";
import BlogPost from "@blog/lib/blogPost";
import Balancer from "react-wrap-balancer";
import CldImageWrapper from "../../utils/CldImageWrapper";
import BlockLink from "../../BlockLink";

type Props = {
  entry: BlogPost
  hero?: boolean
  style?: React.CSSProperties
}

export const ArticleGrid = ({children}: any) => (
  <div className={styles.article_grid}>
    {children}
  </div>
)

const ArticleCard = ({entry, hero = false, style}: Props) => {

  const articlePath = '/blog/' + entry.slug
  const thumbnail = getPureCloudinaryPath(entry.thumbnail ?? '/TwitterCard')

  return (
    <BlockLink href={articlePath} prefetch={false}>
      <div className={styles.window} data-hero-article={hero} style={style}>
        <div className={styles.tags}>
          {entry.tags
            .split(',')
            .map((t: string) => t.trim())
            .map(tag => <Tag tag={tag} key={tag}/>)
          }
        </div>
        <div className={styles.thumbnail_wrapper}>
          <CldImageWrapper
            src={thumbnail}
            alt={'thumbnail of ' + entry.slug}
            width={hero ? 1000 : 600}
            height={300}
            style={{objectFit:"cover"}}
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.h3_wrapper}>
          <h3>
            <Balancer>
              <ParseWithBudouX str={entry.title} slug={entry.slug}/>
            </Balancer>
          </h3>
        </div>
        <div className={styles.information}>
          <FontAwesomeIcon icon={faCalendarDay} style={{margin: 'auto'}}/>{' '}
          {dayjs(entry.date).format('YYYY-MM-DD')} <br/>
          <FontAwesomeIcon icon={faClock} style={{margin: 'auto'}}/>{' '}
          {Math.ceil(entry.readTime / 60)} min to read
        </div>
      </div>
    </BlockLink>
  )
}

export default ArticleCard
