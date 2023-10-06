import React, { CSSProperties } from 'react'

import { MDXRemote } from 'next-mdx-remote/rsc'

import { Block } from '@/components/molecules/Block'

import { PageNavigation } from '@blog/_components/PageNavigation'
import { BlogPost } from '@blog/_lib/blogPost'
import { BlogImageData } from '@blog/_lib/imagePropsFetcher'
import styles from '@blog/_styles/blog.module.scss'

import { ArticleRenderer } from './ArticleRenderer'
import { getMarkdownPlugins } from './rendererProperties'

export const parseInlineMarkdown = (markdown: string) => {
  const isDevClient =
    process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
  return isDevClient ? (
    <ArticleRenderer
      toRender={markdown}
      markdownOptions={{
        components: {
          p: ({ children }: any) => <>{children}</>,
        },
        options: {
          mdxOptions: {
            ...getMarkdownPlugins(),
          },
        },
      }}
    />
  ) : (
    <MDXRemote
      source={markdown}
      components={{
        p: ({ children }) => <>{children}</>,
      }}
      options={{
        mdxOptions: {
          ...getMarkdownPlugins(),
          format: 'md',
        },
      }}
    />
  )
}

type Props = {
  entry: BlogPost
  imageSize: { [path: string]: BlogImageData }
  style?: CSSProperties
  className?: string
}

export const BlogMarkdown = React.memo(function InnerBlogMarkdown(
  props: Props,
) {
  const { entry, imageSize, style, className } = props
  const markdown = entry.content

  return (
    <>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 && (
            <>
              <span id={'article'} />
              <PageNavigation entry={entry} doNotShowOnFirst={true} />
            </>
          )}
          <article className={styles.post} style={{ wordBreak: 'break-word' }}>
            <ArticleRenderer
              toRender={content}
              entry={entry}
              imageSize={imageSize}
            />
          </article>
          {idx === markdown.length - 1 && <PageNavigation entry={entry} />}
        </Block>
      ))}
    </>
  )
})
