'use client'

import * as React from 'react'

export function WritingToolsSection(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="tw:px-2.5 tw:pt-2 tw:pb-1">
      <div className="tw:mb-1.5 tw:text-[0.85rem] tw:font-bold">{props.title}</div>
      {props.children}
    </div>
  )
}
