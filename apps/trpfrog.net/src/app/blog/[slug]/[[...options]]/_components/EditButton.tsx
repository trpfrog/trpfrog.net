'use client'

import { RichButton } from 'src/components/atoms/RichButton'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

import { clientEnv } from '@/env/client'

export function EditButton({ slug }: { slug: string }) {
  return clientEnv.NODE_ENV === 'development' ? (
    <RichButton as="button" onClick={() => openInCotEditor(slug)}>
      編集する
    </RichButton>
  ) : (
    <></>
  )
}
