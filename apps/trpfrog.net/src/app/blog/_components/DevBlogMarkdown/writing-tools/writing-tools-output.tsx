'use client'

import * as React from 'react'

import { PlainCodeBlock } from '@/components/molecules/CodeBlock/PlainCodeBlock'

export function WritingToolsOutput(props: { outputText: string; codeBlockContent: string }) {
  return (
    <div className="tw:p-[5px] tw:text-[0.8em]">
      <PlainCodeBlock
        fileName="Output"
        copyContent={props.outputText ? props.outputText : undefined}
      >
        {props.codeBlockContent}
      </PlainCodeBlock>
    </div>
  )
}
