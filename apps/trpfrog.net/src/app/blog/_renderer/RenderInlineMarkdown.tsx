import { MDXRemote } from 'next-mdx-remote/rsc'

import { getMarkdownOptions } from '@blog/_renderer/rendererProperties.tsx'

export const RenderInlineMarkdown = (props: { markdown: string }) => {
  const options = getMarkdownOptions({ inline: true })
  return <MDXRemote source={props.markdown} {...options} />
}
