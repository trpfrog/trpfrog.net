import * as React from 'react'

import { ScrollArea, ScrollAreaViewport } from '@ui-sdk/react/scroll-area'
import type { Except } from 'type-fest'

import { CopyButton } from '@/components/atoms/CopyButton'
import { tv } from '@/lib/tailwind'

import { CodeLinkButton } from './CodeLinkButton'

export type PlainCodeBlockProps = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
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
      'tw:flex tw:h-fit tw:w-full tw:items-center tw:justify-between',
      'tw:rounded-t-lg tw:bg-trpfrog-500 tw:px-4 tw:py-1 tw:dark:bg-trpfrog-600',
    ],
    lang: 'tw:text-xs tw:font-bold tw:text-white',
    barButton: 'tw:grid tw:place-items-center tw:text-white tw:opacity-50 tw:hover:opacity-100',
    codeWrapper: [
      'tw:w-full tw:overflow-clip',
      'tw:font-mono tw:text-[0.8em] tw:sp:text-xs',
      'tw:border tw:border-trpfrog-500 tw:dark:border-trpfrog-600',
    ],
    viewport: 'tw:w-full',
    code: 'tw:py-4 tw:sp:py-3',
    line: 'tw:inline-block tw:w-full tw:px-4 tw:sp:px-3',
  },
  variants: {
    showBar: {
      true: {
        codeWrapper: 'tw:rounded-b-lg',
        code: 'tw:py-3',
      },
      false: {
        codeWrapper: 'tw:rounded-lg',
      },
    },
    wrap: {
      true: {
        code: 'tw:whitespace-pre-wrap',
      },
      false: {
        code: 'tw:w-full tw:min-w-max',
      },
    },
  },
  defaultVariants: {
    showBar: true,
    wrap: false,
  },
})

export function PlainCodeBlock(props: PlainCodeBlockProps) {
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
          <div className="tw:flex tw:gap-2">
            {url && <CodeLinkButton url={url} className={styles.barButton()} />}
            {copyContent && <CopyButton copyContent={copyContent} className={styles.barButton()} />}
          </div>
        </div>
      )}
      <ScrollArea className={styles.codeWrapper()}>
        <ScrollAreaViewport
          className={styles.viewport()}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
          {children && <pre className="tw:p-1">{children}</pre>}
        </ScrollAreaViewport>
      </ScrollArea>
    </div>
  )
}
