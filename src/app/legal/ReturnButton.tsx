'use client'

import path from 'path'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ReturnButton() {
  const pathname = usePathname()
  const basename = path.basename(pathname ?? '')

  if (basename.startsWith('legal')) {
    return <></>
  } else {
    return (
      // @ts-ignore
      <Link href={'/legal'} className={'linkButton'}>
        戻る
      </Link>
    )
  }
}
