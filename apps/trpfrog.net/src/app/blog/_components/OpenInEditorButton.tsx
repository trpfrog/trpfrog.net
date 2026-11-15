'use client'

import { toast } from '@ui-sdk/react/toast'

import { RichButton } from '@/components/atoms/RichButton'

export function OpenInEditorButton(props: { openInEditor: () => Promise<void> }) {
  return (
    <RichButton
      onClick={() => {
        props.openInEditor().catch((error: unknown) => {
          toast.error(error instanceof Error ? error.message : 'エディタで開けませんでした')
        })
      }}
    >
      編集する
    </RichButton>
  )
}
