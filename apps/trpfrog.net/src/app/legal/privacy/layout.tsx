import type { ReactNode } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
}

export default function PrivacyLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
