import React from 'react'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { doMarkdownHMR } from '@blog/_lib/fileWatch'
import BlogPost from '@blog/_lib/blogPost'
import { BlogImageData } from '@blog/_lib/imagePropsFetcher'
import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'
import ReactMarkdown from 'react-markdown'
import { IsomorphicMarkdownComponent } from '@/lib/types'

export type MarkdownOptions = Omit<MDXRemoteProps, 'source' | 'components'> & {
  components: IsomorphicMarkdownComponent
}

export type ArticleRendererProps =
  | {
      toRender: string
      markdownOptions: MarkdownOptions
    }
  | {
      toRender: string
      entry?: BlogPost
      imageSize?: Record<string, BlogImageData>
    }

export default React.memo(function ArticleRenderer(
  props: ArticleRendererProps,
) {
  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions(props.entry, props.imageSize)
  }

  const isDevClient =
    process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
  return isDevClient ? (
    <ReactMarkdown
      components={options.components}
      remarkPlugins={options.options?.mdxOptions?.remarkPlugins ?? undefined}
      rehypePlugins={options.options?.mdxOptions?.rehypePlugins ?? undefined}
    >
      {props.toRender}
    </ReactMarkdown>
  ) : (
    <MDXRemote source={props.toRender} {...options} />
  )
})
