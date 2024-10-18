import { memo } from 'react'

import { BlogPost } from '@trpfrog.net/posts'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

export type MarkdownOptions = Omit<MDXRemoteProps, 'source' | 'components'> & {
  components: MDXRemoteProps['components']
}

type ArticleRendererProps =
  | {
      toRender: string
      markdownOptions: MarkdownOptions
    }
  | {
      toRender: string
      entry?: BlogPost
    }

export const ArticleRenderer = memo(function ArticleRenderer(props: ArticleRendererProps) {
  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions({ entry: props.entry })
  }

  return <MDXRemote source={props.toRender} {...options} />
})
