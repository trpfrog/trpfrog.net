import { BlogPost } from '@trpfrog.net/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { MarkdownOptions } from '@blog/_renderer/MarkdownOptions.ts'
import { getMarkdownOptions } from '@blog/_renderer/rendererProperties'

type ArticleRendererProps =
  | {
      toRender: string
      markdownOptions: MarkdownOptions
    }
  | {
      toRender: string
      entry?: BlogPost
    }

export function ArticleRenderer(props: ArticleRendererProps) {
  let options: MarkdownOptions
  if ('markdownOptions' in props) {
    options = props.markdownOptions
  } else {
    options = getMarkdownOptions({ entry: props.entry })
  }

  return <MDXRemote source={props.toRender} {...options} />
}
