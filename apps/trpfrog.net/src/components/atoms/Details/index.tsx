import * as React from 'react'

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/react/collapsible'

import { tv } from '@/lib/tailwind'

import panelStyles from './index.module.css'

const styles = tv({
  slots: {
    root: [
      'tw:overflow-hidden tw:rounded-[10px] tw:border-2 tw:border-(--body-background)',
      'tw:shadow-[0_3px_0_0_var(--window-bottom-color)] tw:transition tw:duration-100',
      'tw:not-data-open:hover:-translate-y-0.5',
      'tw:not-data-open:hover:shadow-[0_5px_0_0_var(--window-bottom-color)]',
      'tw:not-data-open:active:translate-y-[3px] tw:not-data-open:active:shadow-none',
      'tw:data-open:shadow-none',
    ],
    trigger: [
      'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:justify-between tw:gap-2',
      'tw:bg-(--body-background) tw:px-[15px] tw:py-[5px] tw:text-left tw:font-bold',
      'tw:after:font-bold tw:after:content-["＋"] tw:after:[-webkit-text-stroke:2px_currentColor]',
      'tw:after:transition tw:after:duration-100 tw:data-open:after:rotate-45',
    ],
  },
})()

export type DetailsProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'onToggle'> & {
  summary: React.ReactNode
  /** 開くまで中身を描画しない。閉じている間はページ内検索にも掛からない。 */
  lazy?: boolean
  defaultOpen?: boolean
}

export function Details(props: DetailsProps) {
  const { className, children, summary, lazy = false, defaultOpen, ...rest } = props
  return (
    <Collapsible defaultOpen={defaultOpen} className={styles.root({ className })} {...rest}>
      <CollapsibleTrigger className={styles.trigger()}>{summary}</CollapsibleTrigger>
      <CollapsiblePanel hiddenUntilFound={!lazy} className={panelStyles.panel}>
        {children}
      </CollapsiblePanel>
    </Collapsible>
  )
}
