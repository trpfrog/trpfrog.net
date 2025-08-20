import * as React from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'

import { ReturnButton } from './ReturnButton'

export default function RootLayout({ children }: LayoutProps<'/legal'>) {
  return (
    <MainWrapper gridLayout>
      {children}
      <ReturnButton />
    </MainWrapper>
  )
}
