'use client'

import * as React from 'react'

import { Button } from '@ui-sdk/react/button'
import { Input } from '@ui-sdk/react/input'

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
        <Input
          className="tw:w-full tw:rounded-md tw:border tw:border-[rgba(0,0,0,0.15)] tw:bg-(--window-bkg-color) tw:px-2 tw:py-1.5 tw:text-[0.85rem] tw:text-inherit"
          value={props.tweetUrl}
          onValueChange={value => props.onTweetUrlChange(value)}
          placeholder="Tweet URL"
          aria-label="Tweet URL"
        />
        <Button
          className="tw:rounded-md tw:border tw:border-(--header-color) tw:bg-transparent tw:px-2 tw:py-1.5 tw:text-[0.85rem] tw:font-semibold tw:text-(--header-color) tw:transition-colors tw:duration-150 tw:hover:bg-(--header-color) tw:hover:text-white tw:active:opacity-90"
          onClick={
            shouldGenerateFromClipboard ? props.onGenerateFromServerClipboard : props.onGenerate
          }
        >
          {shouldGenerateFromClipboard ? 'Generate from server clipboard' : 'Generate'}
        </Button>
      </div>
    </WritingToolsSection>
  )
}
