'use client'

import React from 'react'
import Link from 'next/link'

export default function EditButton({ slug }: { slug: string }) {
  return (
    <Link className={'linkButton'} href={`/blog/edit/${slug}`}>
      編集する
    </Link>
  )
}
