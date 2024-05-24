'use client'

import * as path from 'path'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { RichButton } from '@/components/atoms/RichButton'

export function ReturnButton() {
  const pathname = usePathname()
  const basename = path.basename(pathname ?? '')

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return (
      <RichButton as={Link} href={'/legal'}>
        戻る
      </RichButton>
    )
  }
}
