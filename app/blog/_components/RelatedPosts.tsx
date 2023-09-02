'use client'

import styles from '@blog/_styles/blog.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ArticleCard from './ArticleCard'
import Link from 'next/link'
import React from 'react'
import BlogPost from '@blog/_lib/blogPost'
import ArticleGrid from '@blog/_components/ArticleGrid'

const RelatedPosts = ({
  tag,
  relatedPosts,
}: {
  tag: string
  relatedPosts: BlogPost[]
}) => {
  if (relatedPosts.length <= 0) {
    return <></>
  } else {
    return (
      <>
        <div className={styles.hrule_block}>
          <FontAwesomeIcon icon={faStar} /> タグ「{tag}」の新着記事{' '}
          <FontAwesomeIcon icon={faStar} />
        </div>
        <ArticleGrid>
          {relatedPosts.slice(0, 6).map((e, idx) => (
            <div key={e.slug} className={idx > 2 ? 'only-on-pc' : ''}>
              <ArticleCard entry={e} />
            </div>
          ))}
        </ArticleGrid>

        {/* PC */}
        {relatedPosts.length > 6 && (
          <div style={{ textAlign: 'center' }} className={'only-on-pc'}>
            {/* @ts-ignore */}
            <Link href={'/blog/tags/' + tag} className={'linkButton'}>
              もっと見る (さらに {relatedPosts.length - 6} 件の記事)
            </Link>
          </div>
        )}

        {/* SMARTPHONES */}
        {relatedPosts.length > 3 && (
          <div style={{ textAlign: 'center' }} className={'only-on-sp'}>
            {/* @ts-ignore */}
            <Link href={'/blog/tags/' + tag} className={'linkButton'}>
              もっと見る (さらに {relatedPosts.length - 3} 件の記事)
            </Link>
          </div>
        )}
      </>
    )
  }
}

export default RelatedPosts
