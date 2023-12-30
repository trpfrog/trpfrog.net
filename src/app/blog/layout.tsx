import * as React from 'react'

import { Metadata } from 'next'

import { UDFontStateProvider } from '@blog/_components/UDFontBlock'

export const metadata: Metadata = {
  title: {
    absolute: 'つまみログ',
    template: '%s - つまみログ',
  },
}

type Props = {
  children: React.ReactNode
}

export default function BlogLayout({ children }: Props) {
  return <UDFontStateProvider>{children}</UDFontStateProvider>
}
