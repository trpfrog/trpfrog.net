'use client'
import { MagicButton } from '@/components/atoms/Button'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

export function EditButton({ slug }: { slug: string }) {
  return process.env.NODE_ENV === 'development' ? (
    <MagicButton onClick={() => openInCotEditor(slug)}>編集する</MagicButton>
  ) : (
    <></>
  )
}
