import React, { CSSProperties } from 'react'

import { MDXRemote } from 'next-mdx-remote/rsc'

import { Block } from '@/components/molecules/Block'

import { PageNavigation } from '@blog/_components/PageNavigation'
import { BlogPost } from '@blog/_lib/blogPost'
import styles from '@blog/_styles/blog.module.scss'

import { ArticleRenderer } from './ArticleRenderer'
import { getMarkdownOptions } from './rendererProperties'

export const parseInlineMarkdown = (markdown: string) => {
  const options = getMarkdownOptions(undefined, true)
  return <MDXRemote source={markdown} {...options} />
}

type Props = {
  entry: BlogPost
  style?: CSSProperties
  className?: string
}

export const BlogMarkdown = React.memo(function InnerBlogMarkdown(
  props: Props,
) {
  const { entry, style, className } = props
  const markdown = entry.content

  return (
    <>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <span id={'article'} />
              <PageNavigation entry={entry} doNotShowOnFirst={true} />
            </div>
          )}
          <article className={styles.post} style={{ wordBreak: 'break-word' }}>
            <ArticleRenderer toRender={content} entry={entry} />
          </article>
          {idx === markdown.length - 1 && (
            <div style={{ marginTop: '1rem' }}>
              <PageNavigation entry={entry} />
            </div>
          )}
        </Block>
      ))}
    </>
  )
})
