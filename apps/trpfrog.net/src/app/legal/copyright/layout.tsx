import type { ReactNode } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '著作権について',
}

export default function CopyrightLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
