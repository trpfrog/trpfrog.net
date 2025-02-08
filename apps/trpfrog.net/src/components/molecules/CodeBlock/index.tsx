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
import { addClassToHast, bundledLanguages, getSingletonHighlighter } from 'shiki'

import { WithTooltip } from '@/components/atoms/ButtonWithTooltip'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

import { normalizeLangName } from './normalizeLangName'
import { PlainCodeBlock } from './PlainCodeBlock'
import './shiki-style.css'

export type CodeBlockProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: string
  language?: string
  fileName?: string
  url?: string
}

const createStyles = tv({
  slots: {
    code: 'tw-py-4 sp:tw-py-3',
    line: 'tw-inline-block tw-w-full tw-px-4 sp:tw-px-3',
  },
  variants: {
    showBar: {
      true: { code: 'tw-py-3' },
      false: {},
    },
    wrap: {
      true: { code: 'tw-whitespace-pre-wrap' },
      false: { code: 'tw-w-full tw-min-w-max' },
    },
  },
  defaultVariants: {
    showBar: true,
    wrap: false,
  },
})

const langAlias: Record<string, string> = {
  txt: 'text',
}

function extractPrefixes(language: string) {
  const prefixes: string[] = (language?.match(/([^:]+):/g) ?? []).map(prefix => {
    language = language.replace(prefix, '')
    return prefix.replace(':', '')
  })
  return { prefixes, language }
}

const highlighter = await getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: [], // no languages are loaded initially
  langAlias,
})

async function loadLanguage(language: string): Promise<boolean> {
  language = language?.split(':').slice(-1)[0]
  language = langAlias[language] ?? language

  // built-in languages
  if (['ansi', 'text'].includes(language)) {
    return true
  }

  if (!highlighter.getLoadedLanguages().includes(language)) {
    // check if the language is bundled
    if (!(language in bundledLanguages)) {
      return false
    }
    // lazy load the language
    const langModule = await bundledLanguages[language as keyof typeof bundledLanguages]()
    await highlighter.loadLanguage(langModule)
  }
  return true
}

export function CodeLinkButton(props: { url: string }) {
  const isGitHub = /https?:\/\/github.com/.test(props.url)
  return (
    <WithTooltip hoveredTooltipContent={isGitHub ? 'Open on GitHub' : 'View Code'}>
      <A
        openInNewTab
        href={props.url}
        className="tw-grid tw-place-items-center tw-text-white tw-opacity-50 hover:tw-opacity-100"
      >
        <FontAwesomeIcon icon={isGitHub ? faGithub : faLink} />
      </A>
    </WithTooltip>
  )
}

export async function CodeBlock(props: CodeBlockProps) {
  const { children, language: rawLanguage = '', fileName, url, ...rest } = props

  const isValidLanguage = await loadLanguage(rawLanguage)

  const { prefixes, language } = extractPrefixes(isValidLanguage ? rawLanguage : 'text')

  const showBar = !prefixes.includes('no-header') && isValidLanguage
  const styles = createStyles({ showBar, wrap: prefixes.includes('wrap') })

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
    <PlainCodeBlock
      fileName={fileName || normalizeLangName(language)}
      url={url}
      showBar={showBar}
      wrap={prefixes.includes('wrap')}
      copyContent={children as string}
      dangerouslySetInnerHTML={{ __html: codeHtml }}
      {...rest}
    />
  )
}
