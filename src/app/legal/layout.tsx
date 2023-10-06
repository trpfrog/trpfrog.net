import React from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'

import ReturnButton from './ReturnButton'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <MainWrapper>
      {children}
      <ReturnButton />
    </MainWrapper>
  )
}
