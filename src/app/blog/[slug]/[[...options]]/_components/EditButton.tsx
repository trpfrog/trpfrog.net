'use client'

import { MagicButton } from '@/components/atoms/MagicButton'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

import { clientEnv } from '@/env/client'

export function EditButton({ slug }: { slug: string }) {
  return clientEnv.NODE_ENV === 'development' ? (
    <MagicButton onClick={() => openInCotEditor(slug)}>編集する</MagicButton>
  ) : (
    <></>
  )
}
