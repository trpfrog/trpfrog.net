import React from 'react'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import ReactMarkdown from 'react-markdown'

import { IsomorphicMarkdownComponent } from '@/lib/types'

import BlogPost from '@blog/_lib/blogPost'
import { BlogImageData } from '@blog/_lib/imagePropsFetcher'
import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

export type MarkdownOptions = Omit<MDXRemoteProps, 'source' | 'components'> & {
  components: IsomorphicMarkdownComponent
}

export type ArticleRendererProps =
  | {
      toRender: string
      markdownOptions: MarkdownOptions
      useClient?: boolean
    }
  | {
      toRender: string
      entry?: BlogPost
      imageSize?: Record<string, BlogImageData>
      useClient?: boolean
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
  return isDevClient || props.useClient ? (
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
