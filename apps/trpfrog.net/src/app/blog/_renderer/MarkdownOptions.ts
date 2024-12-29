import { MDXRemoteProps } from 'next-mdx-remote/rsc'

export type MarkdownOptions = Omit<MDXRemoteProps, 'source' | 'components'> & {
  components: MDXRemoteProps['components']
}
