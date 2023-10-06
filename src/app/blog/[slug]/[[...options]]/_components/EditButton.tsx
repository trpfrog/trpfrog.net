'use client'

import React from 'react'

import { Button } from '@/components/atoms/Button'

export function EditButton({ slug }: { slug: string }) {
  return <Button href={`/blog/edit/${slug}`}>編集する</Button>
}
