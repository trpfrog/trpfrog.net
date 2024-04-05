'use client'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

import { clientEnv } from '@/env/client'
import { RichButton } from 'src/components/atoms/RichButton'

export function EditButton({ slug }: { slug: string }) {
  return clientEnv.NODE_ENV === 'development' ? (
    <RichButton as="button" onClick={() => openInCotEditor(slug)}>
      編集する
    </RichButton>
  ) : (
    <></>
  )
}
