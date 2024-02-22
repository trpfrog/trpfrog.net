'use client'

import path from 'path'

import { usePathname } from 'next/navigation'

import { MagicButton } from 'src/components/atoms/MagicButton'

export function ReturnButton() {
  const pathname = usePathname()
  const basename = path.basename(pathname ?? '')

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return <MagicButton href={'/legal'}>戻る</MagicButton>
  }
}
