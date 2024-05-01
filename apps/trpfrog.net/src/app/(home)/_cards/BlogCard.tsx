import { BlogPost } from '@trpfrog.net/posts'
import { readAllBlogPosts } from '@trpfrog.net/posts/fs'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { A } from '@/components/wrappers'

import { tv, VariantProps } from '@/lib/tailwind/variants'
import { replaceWithLighterImageFormat } from '@/lib/utils'

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
        wrapper: `
          tw-from-pink-500 tw-to-pink-500/40 
          dark:tw-from-pink-900 dark:tw-to-pink-900/40
        `,
        button: 'tw-translate-y-3',
      },
      1: {
        wrapper: `
          tw-from-amber-500 tw-to-amber-500/40
          dark:tw-from-amber-900 dark:tw-to-amber-900/40
        `,
      },
      2: {
        wrapper: `
          tw-from-lime-600 tw-to-lime-600/40
          dark:tw-from-lime-900 dark:tw-to-lime-900/40
        `,
      },
    },
  },
})

function getCloudinaryResizedUrl(url: string, width = 600) {
  url = replaceWithLighterImageFormat(url)
  if (/\/image\/upload\/.*\/blog/.test(url)) {
    return url.replace(/\/image\/upload\/.*\/blog/, `/image/upload/w_${width}/blog`)
  } else if (url.includes('/image/upload/')) {
    return url.replace('/image/upload/', `/image/upload/w_${width}/`)
  } else {
    return url.replace('trpfrog/blog', `trpfrog/w_${width}/blog`)
  }
}

function ArticleRow(props: {
  entry: BlogPost
  variant: Required<VariantProps<typeof createArticleStyle>>
}) {
  const { entry, variant } = props
  const articleStyle = createArticleStyle(variant)
  const resizedThumbnailUrl = entry.thumbnail && getCloudinaryResizedUrl(entry.thumbnail, 700)
  return (
    <div
      key={entry.slug}
      className={articleStyle.bg()}
      style={{
        backgroundImage: `url('${resizedThumbnailUrl}')`,
      }}
    >
      <div className={articleStyle.wrapper()}>
        <div className={articleStyle.info()}>
          <h3 className="tw-mb-1 tw-line-clamp-2 tw-font-bold tw-italic !tw-leading-tight tw-drop-shadow pc:tw-text-lg">
            {entry.title}
          </h3>
          <div className="tw-line-clamp-1 tw-text-ellipsis tw-text-[0.7rem]">
            {entry.description}
          </div>
          <div className="tw-line-clamp-1 tw-text-ellipsis tw-text-[0.7rem]">
            {entry.date}・{Math.floor(entry.readTime / 60)} min to read・
            {entry.tags.map(t => `#${t}`).join(' ')}
          </div>
        </div>
        <A href={`/blog/${entry.slug}`} className={articleStyle.button()}>
          <span className="sp:tw-hidden">記事を</span>読む
          <span className="tw-hidden sp:tw-inline"> &rarr;</span>
        </A>
      </div>
    </div>
  )
}

export async function BlogCard() {
  const articles = await readAllBlogPosts({})

  const latestFeaturedArticles = articles.filter(e => !!e.thumbnail).slice(0, 3)

  return (
    <TopCard title="Blog" titlePosition="top-right">
      <div className="tw-grid tw-h-full tw-w-full tw-grid-rows-3 tw-place-items-center">
        {latestFeaturedArticles.map((article, i) => {
          const rightToLeft = i % 2 === 1
          const index = (i % 3) as 0 | 1 | 2
          return <ArticleRow key={article.slug} entry={article} variant={{ rightToLeft, index }} />
        })}
      </div>
    </TopCard>
  )
}
