import { BlogPost } from '@trpfrog.net/posts'

import { Block } from '@/components/molecules/Block'
import { StickToTop } from '@/components/organisms/Header'

import { ArticleCard } from '@blog/_components/ArticleCard'
import { PageNavigation } from '@blog/_components/PageNavigation'
import styles from '@blog/_styles/blog.module.scss'

import { RichEntryButtons } from './EntryButtons'

type Props = {
  post: BlogPost
}

export function ArticleSidebar({ post }: Props) {
  return (
    <StickToTop top={'1em'}>
      <ArticleCard
        entry={post}
        style={{
          pointerEvents: 'none',
          borderRadius: 30,
          marginBottom: '1em',
        }}
      />
      <Block className={styles.blog_side_bar} style={{ padding: '1.5em 0.5em' }}>
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'top' }}>
          <RichEntryButtons post={post} extended={false} />
          <div style={{ height: '1em' }} />
          <PageNavigation entry={post} />
        </div>
      </Block>
    </StickToTop>
  )
}
