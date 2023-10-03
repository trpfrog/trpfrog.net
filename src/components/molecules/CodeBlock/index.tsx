'use client'

import React, { useId } from 'react'

import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Tooltip } from 'react-tooltip'

import { normalizeLangName } from '@/components/molecules/CodeBlock/normalizeLangName'

import styles from './index.module.scss'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('sh', sh)
SyntaxHighlighter.registerLanguage('shell', sh)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)

export type CodeBlockProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  children?: string
  language?: string
  fileName?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const { className = '', children, language = '', fileName, ...rest } = props

  const tooltipId = useId()
  const [isCopyTooltipOpen, setIsCopyTooltipOpen] = React.useState(false)
  const [tooltipTimeout, setTooltipTimeout] = React.useState<number | null>(
    null,
  )

  return (
    <div {...rest}>
      {language != '' && (
        <div className={styles.code_lang_wrapper}>
          <span className={styles.code_lang}>
            {fileName || normalizeLangName(language)}
          </span>
          <div
            className={styles.copy_button}
            data-tooltip-id={tooltipId}
            onClick={() => {
              navigator.clipboard
                .writeText(children as string)
                .catch(console.error)
              if (tooltipTimeout) {
                clearTimeout(tooltipTimeout)
              }
              setIsCopyTooltipOpen(true)
              const timeoutId = window.setTimeout(() => {
                setIsCopyTooltipOpen(false)
              }, 2000)
              setTooltipTimeout(timeoutId)
            }}
            onMouseLeave={() => {
              if (tooltipTimeout) {
                clearTimeout(tooltipTimeout)
              }
              setIsCopyTooltipOpen(false)
            }}
          >
            <FontAwesomeIcon icon={faClone} />
          </div>
          <Tooltip
            id={tooltipId}
            place={'top'}
            style={{ padding: '0.5em', lineHeight: 1 }}
          >
            {isCopyTooltipOpen ? 'Copied!' : 'Copy'}
          </Tooltip>
        </div>
      )}
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={a11yDark}
        className={styles.code_block}
      >
        {children as string}
      </SyntaxHighlighter>
    </div>
  )
}
