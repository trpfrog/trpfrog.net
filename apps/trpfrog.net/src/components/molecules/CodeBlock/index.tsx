import 'server-only'
import * as React from 'react'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { addClassToHast, bundledLanguages, createHighlighter } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

import { WithTooltip } from '@/components/atoms/ButtonWithTooltip'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind'

import './shiki-style.css'
import { LanguageCode } from './language-code'
import { languageDisplayNames } from './language-display-names'
import { PlainCodeBlock } from './PlainCodeBlock'

import type { Except } from 'type-fest'

export type CodeBlockProps = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: string
  language?: LanguageCode
  fileName?: string
  url?: string
  showBar?: boolean
}

const createStyles = tv({
  slots: {
    code: 'tw:py-4 tw:sp:py-3',
    line: 'tw:inline-block tw:w-full tw:px-4 tw:sp:px-3',
  },
  variants: {
    showBar: {
      true: { code: 'tw:py-3' },
      false: {},
    },
    wrap: {
      true: { code: 'tw:whitespace-pre-wrap' },
      false: { code: 'tw:w-full tw:min-w-max' },
    },
  },
  defaultVariants: {
    showBar: true,
    wrap: false,
  },
})

/**
 * v3: getSingletonHighlighter は使わず、モジュールスコープのシングルトンを自前で確保。
 * Oniguruma エンジンを明示し、WASM を遅延 import。
 */
let highlighterPromise: Promise<import('shiki').Highlighter> | undefined

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [], // 言語は後から lazy load
      engine: createOnigurumaEngine(() => import('shiki/wasm')),
    })
  }
  return highlighterPromise
}

async function loadLanguage(languageCode: LanguageCode): Promise<void> {
  const highlighter = await getHighlighter()

  // built-in languages
  if (languageCode === 'text' || languageCode === 'ansi') {
    return
  }
  // lazy load the language
  const langModule = await bundledLanguages[languageCode]()
  await highlighter.loadLanguage(langModule)
}

export function CodeLinkButton(props: { url: string }) {
  const isGitHub = /https?:\/\/github.com/.test(props.url)
  return (
    <WithTooltip hoveredTooltipContent={isGitHub ? 'Open on GitHub' : 'View Code'}>
      <A
        openInNewTab
        href={props.url}
        className="tw:grid tw:place-items-center tw:text-white tw:opacity-50 tw:hover:opacity-100"
      >
        <FontAwesomeIcon icon={isGitHub ? faGithub : faLink} />
      </A>
    </WithTooltip>
  )
}

export async function CodeBlock(props: CodeBlockProps) {
  'use cache'

  const { children, language, showBar, fileName, url, ...rest } = props

  if (language) {
    await loadLanguage(language)
  }

  const styles = createStyles({ showBar }) // TODO: `wrap: prefixes.includes('wrap')` が何に使われていたのか調べる

  const highlighter = await getHighlighter()
  const codeHtml = highlighter.codeToHtml((props.children as string).trimEnd(), {
    lang: language ?? 'text',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    cssVariablePrefix: '--shiki-',
    transformers: [
      transformerNotationDiff({ matchAlgorithm: 'v3' }),
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
    <PlainCodeBlock
      fileName={fileName ?? (language ? languageDisplayNames[language] : undefined)}
      url={url}
      showBar={showBar}
      copyContent={children as string}
      dangerouslySetInnerHTML={{ __html: codeHtml }}
      {...rest}
    />
  )
}
