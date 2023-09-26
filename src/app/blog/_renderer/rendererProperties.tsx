import React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXComponents } from 'mdx/types'
import { SerializeOptions } from 'next-mdx-remote/dist/types'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import 'katex/dist/katex.min.css'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import { OpenInNewTab } from '@/components/atoms/OpenInNewTab'
import SyntaxHighlighterWrapper from '@/components/utils/SyntaxHighlighterWrapper'

import { IsomorphicMarkdownComponent } from '@/lib/types'

import BlogImage from '@blog/_components/BlogImage'
import OriginalMarkdownComponent, {
  myMarkdownClasses,
} from '@blog/_components/OriginalMarkdownComponent'
import BlogPost from '@blog/_lib/blogPost'
import { getPureCloudinaryPath } from '@blog/_lib/getPureCloudinaryPath'
import { BlogImageData } from '@blog/_lib/imagePropsFetcher'
import { MarkdownOptions } from '@blog/_renderer/ArticleRenderer'
import styles from '@blog/_styles/blog.module.scss'

const getLangName = (s: string) => {
  switch (s) {
    case 'javascript':
    case 'js':
      return 'JavaScript'
    case 'typescript':
    case 'ts':
      return 'TypeScript'
    case 'sh':
      return 'Shell'
    case 'html':
    case 'yaml':
    case 'css':
    case 'scss':
    case 'tsx':
      return s.toUpperCase()
    default:
      return s.charAt(0).toUpperCase() + s.slice(1)
  }
}

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
      ? getLangName(className.replace('language-', '').split('.').slice(-1)[0])
      : ''

    const languageCamelCase = language
      .split('-')
      .map(word =>
        word.length > 0 ? word[0].toUpperCase() + word.slice(1) : '',
      )
      .join('')

    type ComponentNameType = keyof typeof myMarkdownClasses
    const isValidComponentName = (name: string): name is ComponentNameType => {
      return name in myMarkdownClasses
    }
    if (isValidComponentName(languageCamelCase)) {
      return (
        <OriginalMarkdownComponent
          componentName={languageCamelCase}
          content={children as string}
          entry={entry}
        />
      )
    }

    const fileName = className?.includes('.')
      ? className.replace('language-', '')
      : ''

    return (
      <pre>
        {language != '' && (
          <div className={styles.code_lang_wrapper}>
            <span className={styles.code_lang}>{fileName || language}</span>
          </div>
        )}
        <SyntaxHighlighterWrapper
          language={language.toLowerCase()}
          style={atomOneDarkReasonable}
          className={`${styles.code_block} ${
            language !== '' ? styles.code_block_with_lang : ''
          }`}
        >
          {children as string}
        </SyntaxHighlighterWrapper>
      </pre>
    )
  }) satisfies MDXComponents['code']
}

export function getMarkdownOptions(
  entry?: BlogPost,
  imageSize?: Record<string, BlogImageData>,
) {
  const components: IsomorphicMarkdownComponent = {
    pre: ({ children }: any) => <div className={''}>{children}</div>, // disable pre tag
    code: formatCodeComponentFactory(entry),

    img: (props: any) => {
      return (
        <BlogImage
          src={props.src ?? ''}
          alt={props.alt ?? ''}
          imageData={
            imageSize
              ? imageSize[getPureCloudinaryPath(props.src ?? '')]
              : undefined
          }
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
