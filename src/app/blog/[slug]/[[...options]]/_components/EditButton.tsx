'use client'
import { openInCotEditor } from '@blog/actions/openInCotEditor'

import { MagicButton } from 'src/components/atoms/MagicButton'

export function EditButton({ slug }: { slug: string }) {
  return process.env.NODE_ENV === 'development' ? (
    <MagicButton onClick={() => openInCotEditor(slug)}>編集する</MagicButton>
  ) : (
    <></>
  )
}
