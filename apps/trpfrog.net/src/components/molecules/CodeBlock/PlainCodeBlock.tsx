import * as React from 'react'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { WithTooltip } from '@/components/atoms/ButtonWithTooltip'
import { CopyButton } from '@/components/atoms/CopyButton'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

export type PlainCodeBlockProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  showBar?: boolean
  wrap?: boolean
  children?: string
  fileName?: string
  copyContent?: string
  dangerouslySetInnerHTML?: { __html: TrustedHTML | string }
  url?: string
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
      'tw-font-mono tw-text-[0.8em] sp:tw-text-xs',
      'tw-border tw-border-trpfrog-500 dark:tw-border-trpfrog-600',
    ],
    code: 'tw-py-4 sp:tw-py-3',
    line: 'tw-inline-block tw-w-full tw-px-4 sp:tw-px-3',
  },
  variants: {
    showBar: {
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
    showBar: true,
    wrap: false,
  },
})

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

export async function PlainCodeBlock(props: PlainCodeBlockProps) {
  const {
    children,
    fileName,
    url,
    copyContent,
    showBar: userShowBar,
    wrap = false,
    dangerouslySetInnerHTML,
    ...rest
  } = props

  const showBar = userShowBar ?? (!!url || !!copyContent || !!fileName)
  const styles = createStyles({ showBar, wrap })

  return (
    <div {...rest}>
      {showBar && (
        <div className={styles.bar()}>
          <span className={styles.lang()}>{fileName}</span>
          <div className="tw-flex tw-gap-2">
            {url && <CodeLinkButton url={url} />}
            {copyContent && <CopyButton copyContent={copyContent} />}
          </div>
        </div>
      )}
      <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} className={styles.codeWrapper()}>
        {children && <pre>{children}</pre>}
      </div>
    </div>
  )
}
