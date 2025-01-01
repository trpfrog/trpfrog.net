import React, { ReactNode, ComponentProps } from 'react'

import 'katex/dist/katex.min.css'
import { BlogPost } from '@trpfrog.net/posts'
import { MDXComponents } from 'mdx/types'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import { env } from '@/env/server'

import { InlineLink } from '@/components/atoms/InlineLink'
import { CodeBlock } from '@/components/molecules/CodeBlock'
import * as Wrapper from '@/components/wrappers'

import { twMerge } from '@/lib/tailwind/merge'

import { BlogH2 } from '@blog/_components/BlogH2'
import { BlogImage } from '@blog/_components/BlogImage'
import type { MarkdownOptions } from '@blog/_renderer/MarkdownOptions'
import styles from '@blog/_styles/blog.module.css'

import {
  isValidCustomCodeBlockComponentName,
  RenderCustomCodeBlockComponent,
} from '../_custom-components/RenderCustomComponent'

import type { SerializeOptions } from '@/../node_modules/next-mdx-remote/dist/types'

function parseLanguageName(className: string) {
  const rawLanguage = className.replace('language-', '')
  if (rawLanguage.includes(':')) {
    return {
      lang: rawLanguage.split(':')[0],
      fileName: rawLanguage.split(':')[1],
      url: rawLanguage.split(':').slice(2).join(':'),
    }
  } else if (rawLanguage.includes('.')) {
    return {
      lang: rawLanguage.split('.').slice(-1)[0],
      fileName: rawLanguage,
    }
  } else {
    return {
      lang: rawLanguage,
      fileName: '',
    }
  }
}

const formatCodeComponentFactory = (entry?: BlogPost) => {
  return function MarkdownCode(props: ComponentProps<'code'>): ReactNode {
    let children = props.children

    // unwrap children if it's an array
    if (Array.isArray(children) && children.length > 0 && typeof children[0] === 'string') {
      children = children[0]
    }

    // return as inline code block
    if (
      typeof children !== 'string' || // content is not string
      ('inline' in props && props.inline) || // inline code
      (!props.className && !children.includes('\n')) // no language and single line
    ) {
      return <code className={styles.inline_code_block}>{children}</code>
    }

    // prettier-ignore
    const { lang, fileName, url } = parseLanguageName(props.className ?? '')

    if (isValidCustomCodeBlockComponentName(lang)) {
      const isDevClient = env.NODE_ENV === 'development' && typeof window !== 'undefined'
      return (
        <RenderCustomCodeBlockComponent
          name={lang}
          markdown={children as string}
          context={{ blog: entry }}
          useDevComponent={isDevClient}
        />
      )
    }

    return (
      <CodeBlock language={lang} fileName={fileName} url={url} className="tw-my-4">
        {children as string}
      </CodeBlock>
    )
  }
}

function styledTag<T extends React.ElementType>(tag: T, className: string) {
  return function StyledTag(props: React.ComponentProps<T>) {
    const { children, className: originalClassName = '', ...rest } = props
    return React.createElement(
      tag,
      {
        className: [className, originalClassName].filter(Boolean).join(' '),
        ...rest,
      },
      children,
    )
  }
}

export function getMarkdownOptions(options?: {
  entry?: BlogPost
  inline?: boolean
  openInNewTab?: 'always' | 'external' | 'never'
}) {
  const components: MDXComponents = {
    pre: ({ children }) => <div className={''}>{children}</div>, // disable pre tag
    code: formatCodeComponentFactory(options?.entry),

    img: props => {
      return (
        <div className={styles.img}>
          <BlogImage
            src={props.src ?? ''}
            alt={props.alt ?? ''}
            caption={props.title}
            spoiler={'data-spoiler' in props}
          />
        </div>
      )
    },

    p: props => {
      const Tag = options?.inline ? 'span' : 'p'
      return <Tag {...props} />
    },

    h2: ({ ref, ...props }) => <BlogH2 {...props} />,
    h3: ({ ref, ...props }) => <Wrapper.H3 {...props} className="tw-mt-8" />,
    h4: ({ ref, ...props }) => <Wrapper.H4 {...props} />,
    h5: ({ ref, ...props }) => <Wrapper.H5 {...props} />,

    ul: ({ ref, ...props }) => <Wrapper.UnorderedList {...props} />,
    ol: ({ ref, ...props }) => <Wrapper.OrderedList {...props} />,
    li: ({ ref, ...props }) => <Wrapper.Li {...props} />,

    a: props => (
      <InlineLink
        openInNewTab={props.href?.startsWith('javascript:') ? false : options?.openInNewTab}
        href={props.href}
      >
        {props.children}
      </InlineLink>
    ),
    kbd: props => {
      const { ref, ...rest } = props
      return <Wrapper.Kbd {...rest} />
    },
    blockquote: styledTag('blockquote', styles.blockquote),
    details: styledTag('details', styles.details),
    summary: styledTag('summary', styles.summary),
    video: props => <BlogImage src={props.src ?? ''} alt="" caption={props.title} isVideo />,

    hr: props => {
      const { ref, className = '', ...rest } = props
      return <Wrapper.HorizontalRule className={className} {...rest} />
    },

    table: props => {
      const { ref, className, ...rest } = props
      return <Wrapper.Table className={twMerge('tw-mx-auto', className)} {...rest} />
    },
  }

  return {
    components,
    options: {
      mdxOptions: {
        ...getMarkdownPlugins(),
        format: 'md',
      },
    },
  } satisfies MarkdownOptions
}

function getMarkdownPlugins(): Partial<SerializeOptions['mdxOptions']> {
  return {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkUnwrapImages,
      () => remarkToc({ heading: '目次' }),
    ],
    rehypePlugins: [rehypeKatex, rehypeRaw, rehypeSlug],
  }
}
