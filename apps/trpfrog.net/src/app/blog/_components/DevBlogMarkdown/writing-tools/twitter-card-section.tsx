'use client'

import * as React from 'react'

import { WritingToolsSection } from './writing-tools-section'

export function TwitterCardSection(props: {
  tweetUrl: string
  onTweetUrlChange: (value: string) => void
  onGenerate: () => void
  onGenerateFromServerClipboard: () => void
}) {
  const shouldGenerateFromClipboard = props.tweetUrl.length === 0
  return (
    <WritingToolsSection title="Twitter Card">
      <div className="tw:grid tw:gap-1.5">
        <input
          className="tw:w-full tw:rounded-md tw:border tw:border-[rgba(0,0,0,0.15)]
            tw:bg-(--window-bkg-color) tw:px-2 tw:py-1.5 tw:text-[0.85rem] tw:text-inherit"
          value={props.tweetUrl}
          onChange={e => props.onTweetUrlChange(e.target.value)}
          placeholder="Tweet URL"
        />
        <button
          className="tw:rounded-md tw:border tw:border-(--header-color) tw:bg-transparent tw:px-2
            tw:py-1.5 tw:text-[0.85rem] tw:font-semibold tw:text-(--header-color)
            tw:transition-colors tw:duration-150 tw:hover:tw:bg-(--header-color)
            tw:hover:tw:text-white tw:active:tw:opacity-90"
          type="button"
          onClick={
            shouldGenerateFromClipboard ? props.onGenerateFromServerClipboard : props.onGenerate
          }
        >
          {shouldGenerateFromClipboard ? 'Generate from server clipboard' : 'Generate'}
        </button>
      </div>
    </WritingToolsSection>
  )
}
