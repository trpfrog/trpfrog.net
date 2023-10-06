import React from 'react'

import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'

export const metadata: Metadata = {
  title: 'fuzzy',
  description: 'あいまい URL リダイレクト',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return <MainWrapper>{children}</MainWrapper>
}
