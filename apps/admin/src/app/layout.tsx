import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import { Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'

import './globals.css'
import '@mantine/core/styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'admin.trpfrog.net',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} tw:antialiased`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
