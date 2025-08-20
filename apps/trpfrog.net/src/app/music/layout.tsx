import * as React from 'react'

import { Metadata } from 'next'

import { MainWrapper } from '@/components/atoms/MainWrapper'

export const metadata: Metadata = {
  title: 'つまみのうた',
  description: 'ねぎ一世さん作曲「つまみのうた」の歌詞',
}

export default function RootLayout({ children }: LayoutProps<'/music'>) {
  return <MainWrapper gridLayout>{children}</MainWrapper>
}
