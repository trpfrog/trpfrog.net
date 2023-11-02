import React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

import { OpenInNewTab } from '@/components/atoms/OpenInNewTab'
import { CodeBlock } from '@/components/molecules/CodeBlock'

import { IsomorphicMarkdownComponent } from '@/lib/types'

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

    return (
      <CodeBlock language={language} fileName={fileName}>
        {children as string}
      </CodeBlock>
    )
  }) satisfies MDXComponents['code']
}

export function getMarkdownOptions(entry?: BlogPost) {
  const components: IsomorphicMarkdownComponent = {
    pre: ({ children }: any) => <div className={''}>{children}</div>, // disable pre tag
    code: formatCodeComponentFactory(entry),

    img: (props: any) => {
      return (
        <BlogImage
          src={props.src ?? ''}
          alt={props.alt ?? ''}
          caption={props.title}
        />
      )
    },

    h2: (props: any) => (
      <h2 className={styles.anchor} id={props.id}>
        <a href={'#' + props.id}>
          <FontAwesomeIcon icon={faPaperclip} />
        </a>
        {props.children}
      </h2>
    ),
    a: (props: any) => (
      <OpenInNewTab href={props.href}>{props.children}</OpenInNewTab>
    ),
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
