'use client'
import { env } from '@/env'

import { MagicButton } from '@/components/atoms/MagicButton'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

export function EditButton({ slug }: { slug: string }) {
  return env.NODE_ENV === 'development' ? (
    <MagicButton onClick={() => openInCotEditor(slug)}>編集する</MagicButton>
  ) : (
    <></>
  )
}
