import React from 'react'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

import { IsomorphicMarkdownComponent } from '@/lib/types'

import { BlogPost } from '@blog/_lib/blogPost'
import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

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
    }

export const ArticleRenderer = React.memo(function ArticleRenderer(
  props: ArticleRendererProps,
) {
  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions(props.entry)
  }

  return <MDXRemote source={props.toRender} {...options} />
})
