import React from 'react'

import { MDXComponents } from 'mdx/types'

import { InlineLink } from '@/components/atoms/InlineLink'
import { RichButton } from '@/components/atoms/RichButton'
import { RichImage } from '@/components/organisms/RichImage'
import * as Wrapper from '@/components/wrappers'
import { twJoin, twMerge } from '@/lib/tailwind'
import { MarkdownContext } from '@/markdown/types'

import { createCodeComponent } from './createCodeComponent'

import styles from './createMDXComponents.module.css'

export function createMDXComponents(options?: {
  inline?: boolean
  openInNewTab?: 'always' | 'external' | 'never'
  context?: MarkdownContext
}): MDXComponents {
  return {
    pre: ({ children }) => <div className={''}>{children}</div>, // disable pre tag

    code: createCodeComponent(options?.context),

    img: props => {
      return (
        <div className={styles.img}>
          <RichImage
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

    h1: () => null, // disable h1 tag
    h2: ({ ref: _ref, ...props }) => <Wrapper.H2 variant="blog" {...props} />,
    h3: ({ ref: _ref, ...props }) => <Wrapper.H3 {...props} className="tw:mt-8" />,
    h4: ({ ref: _ref, ...props }) => <Wrapper.H4 {...props} />,
    h5: ({ ref: _ref, ...props }) => <Wrapper.H5 {...props} />,

    ul: ({ ref: _ref, ...props }) => <Wrapper.UnorderedList {...props} />,
    ol: ({ ref: _ref, ...props }) => <Wrapper.OrderedList {...props} />,
    li: ({ ref: _ref, ...props }) => <Wrapper.Li {...props} />,

    a: props => (
      <InlineLink
        openInNewTab={props.href?.startsWith('javascript:') ? false : options?.openInNewTab}
        href={props.href}
      >
        {props.children}
      </InlineLink>
    ),

    kbd: props => {
      const { ref: _ref, ...rest } = props
      return <Wrapper.Kbd {...rest} />
    },

    blockquote: props => {
      const { className = '', ...rest } = props
      return <blockquote className={twJoin(styles.blockquote, className)} {...rest} />
    },

    details: props => {
      const { ref: _ref, className = '', ...rest } = props
      return <details className={twJoin(styles.details, className)} {...rest} />
    },

    summary: props => {
      const { ref: _ref, className = '', ...rest } = props
      return <summary className={twJoin(styles.summary, className)} {...rest} />
    },

    video: props => <RichImage src={props.src ?? ''} alt="" caption={props.title} isVideo />,

    hr: props => {
      const { ref: _ref, className = '', ...rest } = props
      return <Wrapper.HorizontalRule className={className} {...rest} />
    },

    table: props => {
      const { ref: _ref, className, ...rest } = props
      return <Wrapper.Table className={twMerge('tw:mx-auto', className)} {...rest} />
    },

    button: props => {
      return <RichButton as="button" {...props} />
    },
  }
}
