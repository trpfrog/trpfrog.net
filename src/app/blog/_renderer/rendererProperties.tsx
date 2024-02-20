import * as React from 'react'

import { MDXComponents } from 'mdx/types'
import { SerializeOptions } from 'next-mdx-remote/dist/types'
import 'katex/dist/katex.min.css'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import { InlineLink } from '@/components/atoms/InlineLink'
import { CodeBlock, CodeBlockProps } from '@/components/molecules/CodeBlock'
import { parseDataLine } from '@/components/molecules/CodeBlock/parseDataLine'
import * as Wrapper from '@/components/wrappers'

import { twMerge } from '@/lib/tailwind/merge'

import { BlogH2 } from '@blog/_components/BlogH2'
import { BlogImage } from '@blog/_components/BlogImage'
import {
  isValidExtraCodeBlockComponentName,
  OriginalMarkdownComponent,
} from '@blog/_components/OriginalMarkdownComponent'
import { BlogPost } from '@blog/_lib/blogPost'
import { MarkdownOptions } from '@blog/_renderer/ArticleRenderer'
import styles from '@blog/_styles/blog.module.scss'

const formatCodeComponentFactory = (entry?: BlogPost) => {
  return (props => {
    let { className, children } = props

    const isChildrenString = (ch: any): ch is string => {
      return typeof ch === 'string'
    }

    if (
      Array.isArray(children) &&
      children.length > 0 &&
      isChildrenString(children[0])
    ) {
      children = children[0]
    }

    if (!isChildrenString(children)) {
      return <code className={styles.inline_code_block}>{children}</code>
    }

    if ('inline' in props && props.inline) {
      return <code className={styles.inline_code_block}>{children}</code>
    }

    if (!className && !children.includes('\n')) {
      return <code className={styles.inline_code_block}>{children}</code>
    }

    const language = className
      ? className.replace('language-', '').split('.').slice(-1)[0]
      : ''

    if (isValidExtraCodeBlockComponentName(language)) {
      const isDevClient =
        process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
      return (
        <OriginalMarkdownComponent
          componentName={language}
          content={children as string}
          entry={entry}
          useDevComponent={isDevClient}
        />
      )
    }

    const fileName = className?.includes('.')
      ? className.replace('language-', '')
      : ''

    const highlightLines: CodeBlockProps['highlightLines'] = {
      error: [],
      warning: [],
      info: [],
    }
    if ('data-error' in props) {
      highlightLines.error = parseDataLine(props['data-error'] as string)
    }
    if ('data-warning' in props) {
      highlightLines.warning = parseDataLine(props['data-warning'] as string)
    }
    if ('data-info' in props) {
      highlightLines.info = parseDataLine(props['data-info'] as string)
    }

    return (
      <CodeBlock
        language={language}
        fileName={fileName}
        highlightLines={highlightLines}
      >
        {children as string}
      </CodeBlock>
    )
  }) satisfies MDXComponents['code']
}

function styledTag(tag: React.ElementType, className: string) {
  return function StyledTag(props: any) {
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
    pre: ({ children }: any) => <div className={''}>{children}</div>, // disable pre tag
    code: formatCodeComponentFactory(options?.entry),

    img: (props: any) => {
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

    p: (props: React.ComponentProps<'p'>) => {
      return React.createElement(options?.inline ? 'span' : 'p', props)
    },

    h2: (props: any) => <BlogH2 {...props} />,
    h3: (props: any) => <Wrapper.H3 {...props} className="tw-mt-8" />,
    h4: (props: any) => <Wrapper.H4 {...props} />,
    h5: (props: any) => <Wrapper.H5 {...props} />,

    ul: (props: any) => <Wrapper.UnorderedList {...props} />,
    ol: (props: any) => <Wrapper.OrderedList {...props} />,
    li: (props: any) => <Wrapper.Li {...props} />,

    a: (props: any) => (
      <InlineLink openInNewTab={options?.openInNewTab} href={props.href}>
        {props.children}
      </InlineLink>
    ),
    kbd: (props: any) => <Wrapper.Kbd {...props} />,
    blockquote: styledTag('blockquote', styles.blockquote),
    details: styledTag('details', styles.details),
    summary: styledTag('summary', styles.summary),
    video: (props: any) => (
      <BlogImage
        src={props.src ?? ''}
        alt={props.alt ?? ''}
        caption={props.title}
        isVideo
      />
    ),

    hr: (props: any) => {
      const { className = '', ...rest } = props
      return <Wrapper.HorizontalRule className={className} {...rest} />
    },

    table: (props: any) => {
      let { className, ...rest } = props
      className = twMerge('tw-mx-auto', className)
      return <Wrapper.Table className={className} {...rest} />
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

export function getMarkdownPlugins() {
  return {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkUnwrapImages,
      () => remarkToc({ heading: '目次' }),
    ],
    rehypePlugins: [rehypeKatex, rehypeRaw, rehypeSlug],
  } satisfies Partial<SerializeOptions['mdxOptions']>
}
