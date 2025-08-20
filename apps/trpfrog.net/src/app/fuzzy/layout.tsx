import * as React from 'react'

import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'

export const metadata: Metadata = {
  title: 'fuzzy',
  description: 'あいまい URL リダイレクト',
}

export default function RootLayout({ children }: LayoutProps<'/fuzzy'>) {
  return <MainWrapper gridLayout>{children}</MainWrapper>
}
