import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import { createTheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'

import './globals.css'
import '@mantine/core/styles.css'
import { Shell } from '@/components/Shell'

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

const theme = createTheme({
  colors: {
    main: [
      '#f5fcea',
      '#ebf6d9',
      '#d6ecb1',
      '#c0e185',
      '#add861',
      '#a1d34a',
      '#9ad03d',
      '#86b82f',
      '#76a326',
      '#638d19',
    ],
  },
  primaryColor: 'lime',
})

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} tw:antialiased`}>
        <MantineProvider theme={theme}>
          <ModalsProvider modalProps={{ centered: true }}>
            <Shell>{children}</Shell>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
