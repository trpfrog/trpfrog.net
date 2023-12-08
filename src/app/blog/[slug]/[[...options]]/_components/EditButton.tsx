'use client'

import React from 'react'

import { Button } from '@/components/atoms/Button'

import { openInCotEditor } from '@blog/actions/openInCotEditor'

export function EditButton({ slug }: { slug: string }) {
  return process.env.NODE_ENV === 'development' ? (
    <Button onClick={() => openInCotEditor(slug)}>編集する</Button>
  ) : (
    <></>
  )
}
