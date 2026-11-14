'use client'

import { RichButton } from '@/components/atoms/RichButton'

export function OpenInEditorButton(props: { openInEditor: () => Promise<void> }) {
  return <RichButton onClick={() => props.openInEditor()}>編集する</RichButton>
}
