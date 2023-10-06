'use client'

import path from 'path'

import { usePathname } from 'next/navigation'

import { Button } from '@/components/atoms/Button'

export function ReturnButton() {
  const pathname = usePathname()
  const basename = path.basename(pathname ?? '')

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return <Button href={'/legal'}>戻る</Button>
  }
}
