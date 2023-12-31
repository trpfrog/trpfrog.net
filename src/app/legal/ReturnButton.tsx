'use client'

import path from 'path'

import { usePathname } from 'next/navigation'

import { MagicButton } from '@/components/atoms/Button'

export function ReturnButton() {
  const pathname = usePathname()
  const basename = path.basename(pathname ?? '')

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return <MagicButton href={'/legal'}>戻る</MagicButton>
  }
}
