import * as React from 'react'

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { addClassToHast, bundledLanguages, bundledThemes, getSingletonHighlighter } from 'shiki'

import { CopyButton } from '@/components/atoms/CopyButton'

import { tv } from '@/lib/tailwind/variants'

import { normalizeLangName } from './normalizeLangName'

import './shiki-style.css'

type CodeBlockProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: string
  language?: string
  fileName?: string
}

const createStyles = tv({
  slots: {
    bar: [
      'tw-flex tw-h-fit tw-w-full tw-items-center tw-justify-between',
      'tw-rounded-t-lg tw-bg-trpfrog-500 tw-px-4 tw-py-1 dark:tw-bg-trpfrog-600',
    ],
    lang: 'tw-text-xs tw-font-bold tw-text-white',
    codeWrapper: [
      'tw-w-full tw-overflow-clip tw-overflow-x-scroll',
      'tw-font-mono tw-text-sm sp:tw-text-xs',
      'tw-border tw-border-trpfrog-500 dark:tw-border-trpfrog-600',
    ],
    code: 'tw-py-4 sp:tw-py-3',
    line: 'tw-inline-block tw-w-full tw-px-4 tw-leading-relaxed sp:tw-px-3',
  },
  variants: {
    withBar: {
      true: {
        codeWrapper: 'tw-rounded-b-lg',
        code: 'tw-py-3',
      },
      false: {
        codeWrapper: 'tw-rounded-lg',
      },
    },
    wrap: {
      true: {
        code: 'tw-whitespace-pre-wrap',
      },
      false: {
        code: 'tw-w-full tw-min-w-max',
      },
    },
  },
  defaultVariants: {
    withBar: true,
    wrap: false,
  },
})

const langAlias = {
  txt: 'text',
}

function extractPrefixes(language: string) {
  const prefixes: string[] = (language?.match(/([^:]+):/g) ?? []).map(prefix => {
    language = language.replace(prefix, '')
    return prefix.replace(':', '')
  })
  return { prefixes, language }
}

function isValidLanguage(language: string): boolean {
  // text and ansi are special languages
  return [...Object.keys(bundledLanguages), ...Object.keys(langAlias), 'text', 'ansi'].includes(
    language?.split(':').slice(-1)[0],
  )
}

export async function CodeBlock(props: CodeBlockProps) {
  const { children, language: rawLanguage = '', fileName, ...rest } = props

  const { prefixes, language } = extractPrefixes(
    isValidLanguage(rawLanguage) ? rawLanguage : 'text',
  )

  const withBar = !prefixes.includes('no-header') && isValidLanguage(rawLanguage)

  const styles = createStyles({ withBar, wrap: prefixes.includes('wrap') })

  const highlighter = await getSingletonHighlighter({
    themes: Object.keys(bundledThemes),
    langs: Object.keys(bundledLanguages),
    langAlias,
  })
  const codeHtml = highlighter.codeToHtml((props.children as string).trimEnd(), {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    cssVariablePrefix: '--shiki-',
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationErrorLevel(),
      {
        line(hast) {
          addClassToHast(hast, styles.line())
        },
        postprocess(html) {
          return html.replace('class="shiki', `class="shiki ${styles.code()}`)
        },
      },
    ],
  })

  return (
    <div {...rest}>
      {withBar && (
        <div className={styles.bar()}>
          <span className={styles.lang()}>{fileName || normalizeLangName(language)}</span>
          <CopyButton copyContent={children as string} />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: codeHtml }} className={styles.codeWrapper()} />
    </div>
  )
}
