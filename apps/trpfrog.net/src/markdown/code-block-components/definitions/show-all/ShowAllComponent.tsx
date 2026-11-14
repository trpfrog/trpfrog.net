'use client'
import * as React from 'react'

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/react/collapsible'

import { tv } from '@/lib/tailwind'

type Props = {
  children: React.ReactNode
  preview: React.ReactNode
  className?: string
}

const styles = tv({
  slots: {
    preview: 'tw:relative',
    fog: [
      'tw:pointer-events-none tw:absolute tw:bottom-0 tw:h-[min(60%,400px)] tw:w-full',
      'tw:bg-linear-to-b tw:from-transparent tw:to-(--window-bkg-color)',
      'tw:group-data-open:hidden',
    ],
    triggerWrapper: 'tw:sticky tw:bottom-2.5 tw:text-center',
    trigger: [
      'tw:inline-block tw:w-fit tw:cursor-pointer tw:rounded-full tw:border-2 tw:border-(--base-font-color)',
      'tw:px-4 tw:py-[0.2rem] tw:font-bold tw:opacity-70',
    ],
  },
})()

/**
 * @deprecated Use `@/components/molecules/ShowAll` instead.
 */
export const ShowAllComponent = ({ children, preview, className }: Props) => {
  return (
    <Collapsible className="tw:group">
      <div className={styles.preview({ className })}>
        {preview}
        <div className={styles.fog()} />
      </div>
      <CollapsiblePanel className={className}>{children}</CollapsiblePanel>
      <div className={styles.triggerWrapper()}>
        <CollapsibleTrigger className={styles.trigger()}>
          {state => (state.open ? '折りたたむ' : '続きを読む')}
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
