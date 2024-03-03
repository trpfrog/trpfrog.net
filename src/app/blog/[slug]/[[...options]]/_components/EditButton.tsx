'use client'

import { MagicButton } from '@/components/atoms/MagicButton'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

import { env } from '@/env/server'

export function EditButton({ slug }: { slug: string }) {
  return env.NODE_ENV === 'development' ? (
    <MagicButton onClick={() => openInCotEditor(slug)}>編集する</MagicButton>
  ) : (
    <></>
  )
}
