import { memo } from 'react'

import { MDXComponents } from 'mdx/types'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

import { BlogPost } from '@blog/_lib/blogPost'
import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

export type MarkdownOptions = Omit<MDXRemoteProps, 'source' | 'components'> & {
  components: MDXComponents
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

export const ArticleRenderer = memo(function ArticleRenderer(
  props: ArticleRendererProps,
) {
  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions({ entry: props.entry })
  }

  return <MDXRemote source={props.toRender} {...options} />
})
