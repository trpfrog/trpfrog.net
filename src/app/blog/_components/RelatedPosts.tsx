'use client'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { OnBodyHeading } from '@/components/atoms/OnBodyHeading'

import { ArticleGrid } from '@blog/_components/ArticleGrid'
import { BlogPost } from '@blog/_lib/blogPost'

import { MagicButton } from 'src/components/atoms/MagicButton'

import { ArticleCard } from './ArticleCard'

export const RelatedPosts = ({
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
        <OnBodyHeading icon={faStar}>タグ「{tag}」の新着記事</OnBodyHeading>
        <ArticleGrid>
          {relatedPosts.slice(0, 6).map((e, idx) => (
            <div key={e.slug} className={idx > 2 ? 'sp:tw-hidden' : ''}>
              <ArticleCard entry={e} />
            </div>
          ))}
        </ArticleGrid>

        {/* PC */}
        {relatedPosts.length > 6 && (
          <div style={{ textAlign: 'center' }} className="sp:tw-hidden">
            <MagicButton href={'/blog/tags/' + tag}>
              もっと見る (さらに {relatedPosts.length - 6} 件の記事)
            </MagicButton>
          </div>
        )}

        {/* SMARTPHONES */}
        {relatedPosts.length > 3 && (
          <div style={{ textAlign: 'center' }} className="pc:tw-hidden">
            <MagicButton href={'/blog/tags/' + tag}>
              もっと見る (さらに {relatedPosts.length - 3} 件の記事)
            </MagicButton>
          </div>
        )}
      </>
    )
  }
}
