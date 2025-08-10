import React, { ReactNode, ComponentProps } from 'react'

import { CodeBlock } from '@/components/molecules/CodeBlock'

import styles from './createCodeComponent.module.css'

import type { MarkdownContext } from '@/markdown/types'

import {
  isValidCustomCodeBlockComponentName,
  RenderCustomCodeBlockComponent,
} from '@/markdown/code-block-components'
import { parseMdCodeBlockLanguageName } from '@/components/molecules/CodeBlock/parse-lang-and-filename'

export function createCodeComponent(context: MarkdownContext = {}) {
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

    const rawLanguage = (props.className ?? '').replace('language-', '')
    const { languageCode, languageDisplayName, fileName } =
      parseMdCodeBlockLanguageName(rawLanguage)

    if (isValidCustomCodeBlockComponentName(rawLanguage)) {
      const isDevClient = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
      return (
        <RenderCustomCodeBlockComponent
          name={rawLanguage}
          markdown={children as string}
          context={context}
          useDevComponent={isDevClient}
        />
      )
    }

    return (
      <CodeBlock
        language={languageCode ?? 'text'}
        fileName={fileName ?? languageDisplayName ?? undefined}
        className="tw-my-4"
      >
        {children as string}
      </CodeBlock>
    )
  }
}
