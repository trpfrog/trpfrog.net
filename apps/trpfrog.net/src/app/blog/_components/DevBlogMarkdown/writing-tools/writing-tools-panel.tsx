'use client'

import * as React from 'react'

export function WritingToolsPanel(props: {
  isOpened: boolean
  onToggle: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div
      className="tw:fixed tw:bottom-0 tw:right-[100px] tw:w-[300px]
        tw:shadow-[0_0_10px_0_rgba(0,0,0,0.2)] tw:rounded-t-[10px] tw:overflow-hidden tw:z-100
        tw:bg-(--window-bkg-color) tw:print:invisible tw:max-[800px]:tw:hidden"
    >
      <div
        className="tw:bg-(--header-color) tw:w-full tw:h-[30px] tw:text-white tw:font-bold tw:grid
          tw:place-items-center tw:cursor-pointer"
        onClick={props.onToggle}
      >
        Writing Tools
      </div>
      {props.isOpened && props.children}
      {props.footer}
    </div>
  )
}
