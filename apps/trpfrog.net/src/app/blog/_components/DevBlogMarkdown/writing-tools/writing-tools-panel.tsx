'use client'

import * as React from 'react'

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/react/collapsible'

export function WritingToolsPanel(props: {
  isOpened: boolean
  onOpenChange: (opened: boolean) => void
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <Collapsible
      open={props.isOpened}
      onOpenChange={props.onOpenChange}
      className="tw:fixed tw:bottom-0 tw:right-[100px] tw:z-100 tw:w-[300px] tw:overflow-hidden tw:rounded-t-[10px] tw:bg-(--window-bkg-color) tw:shadow-[0_0_10px_0_rgba(0,0,0,0.2)] tw:print:invisible tw:max-[800px]:hidden"
    >
      <CollapsibleTrigger className="tw:grid tw:h-[30px] tw:w-full tw:cursor-pointer tw:place-items-center tw:bg-(--header-color) tw:font-bold tw:text-white">
        Writing Tools
      </CollapsibleTrigger>
      <CollapsiblePanel>{props.children}</CollapsiblePanel>
      {props.footer}
    </Collapsible>
  )
}
