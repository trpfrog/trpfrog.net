import styles from '@/app/blog/_styles/blog.module.scss'
import React, { CSSProperties } from 'react'
import { BlogImageData } from '@/app/blog/_lib/imagePropsFetcher'
import PageNavigation from '@/app/blog/_components/PageNavigation'
import Block from '@/components/Block'
import { getMarkdownPlugins } from './rendererProperties'
import ArticleRenderer from './ArticleRenderer'
import BlogPost from '@/app/blog/_lib/blogPost'
import { MDXRemote } from 'next-mdx-remote/rsc'

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

const BlogMarkdown = React.memo(function InnerBlogMarkdown(props: Props) {
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

export default BlogMarkdown
