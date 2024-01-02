import { tv } from 'tailwind-variants'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { A } from '@/components/wrappers'

import { retrieveSortedBlogPostList } from '@blog/_lib/load'

const styles = tv({
  slots: {
    card: 'tw-relative',
    blogList:
      'tw-grid tw-h-full tw-w-full tw-grid-rows-3 tw-place-items-center',
  },
})()

const createArticleStyle = tv({
  slots: {
    bg: 'tw-h-full tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat',
    wrapper: [
      'tw-flex tw-h-full tw-w-full tw-items-center tw-justify-between',
      'tw-h-full tw-p-4 tw-text-text-color tw-backdrop-blur-[2px]',
    ],
    info: 'tw-flex tw-w-2/3 tw-flex-col tw-text-white sp:tw-w-3/4',
    button: cardButtonStyle(),
  },
  variants: {
    rightToLeft: {
      true: {
        wrapper: 'tw-flex-row-reverse tw-bg-gradient-to-l',
        info: 'tw-items-end tw-text-right',
      },
      false: {
        wrapper: 'tw-bg-gradient-to-r',
      },
    },
    index: {
      0: {
        wrapper:
          'tw-from-pink-500 tw-to-pink-500/40 dark:tw-from-pink-900 dark:tw-to-pink-900/40',
        button: 'tw-translate-y-3',
      },
      1: {
        wrapper:
          'tw-from-amber-500 tw-to-amber-500/40 dark:tw-from-amber-900 dark:tw-to-amber-900/40',
      },
      2: {
        wrapper:
          'tw-from-lime-600 tw-to-lime-600/40 dark:tw-from-lime-900 dark:tw-to-lime-900/40',
      },
    },
  },
})

export async function BlogCard() {
  const articles = await retrieveSortedBlogPostList()

  const latestFeaturedArticles = articles.filter(e => !!e.thumbnail).slice(0, 3)

  return (
    <TopCard className={styles.card()} title={'Blog'}>
      <div className={styles.blogList()}>
        {latestFeaturedArticles.map((article, i) => {
          const articleStyle = createArticleStyle({
            rightToLeft: i % 2 === 1,
            index: i as 0 | 1 | 2,
          })
          return (
            <div
              key={article.slug}
              className={articleStyle.bg()}
              style={{
                backgroundImage: `url('${article.thumbnail}')`,
              }}
            >
              <div className={articleStyle.wrapper()}>
                <div className={articleStyle.info()}>
                  <h3 className="tw-mb-1 tw-line-clamp-2 tw-font-bold tw-italic !tw-leading-tight pc:tw-text-lg">
                    {article.title}
                  </h3>
                  <div className="tw-line-clamp-1 tw-text-ellipsis tw-text-[0.7rem]">
                    {article.description}
                  </div>
                  <div className="tw-line-clamp-1 tw-text-ellipsis tw-text-[0.7rem]">
                    {article.date}・{Math.floor(article.readTime / 60)} min to
                    read・{article.tags.map(t => `#${t}`).join(' ')}
                  </div>
                </div>
                <A
                  href={`/blog/${article.slug}`}
                  className={articleStyle.button()}
                >
                  <span className="sp:tw-hidden">記事を</span>読む
                  <span className="tw-hidden sp:tw-inline"> &rarr;</span>
                </A>
              </div>
            </div>
          )
        })}
      </div>
    </TopCard>
  )
}
