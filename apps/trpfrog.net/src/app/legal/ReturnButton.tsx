'use client'

import { usePathname } from 'next/navigation'

import { RichButton } from '@/components/atoms/RichButton'

export function ReturnButton() {
  const pathname = usePathname()
  const basename = (pathname ?? '').split('/').filter(Boolean).at(-1) ?? ''

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return <RichButton href="/legal">戻る</RichButton>
  }
}
