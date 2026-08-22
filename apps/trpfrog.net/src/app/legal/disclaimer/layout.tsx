import type { ReactNode } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '免責事項',
}

export default function DisclaimerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
