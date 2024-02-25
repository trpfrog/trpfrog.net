import { Suspense } from 'react'
import * as React from 'react'

import '@/styles/variables.css'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { Metadata } from 'next'
import { Viewport } from 'next'

import { Toaster } from 'react-hot-toast'

import { Favicon } from '@/components/head/Favicon'
import { BackToTop } from '@/components/organisms/BackToTop'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { Navigation } from '@/components/organisms/Navigation'
import { CommentToolbar } from '@/components/utils/CommentToolbar'
import { FixTooLargeFontAwesomeIcons } from '@/components/utils/FixTooLargeFontAwesomeIcons'
import { JotaiProvider } from '@/components/utils/JotaiProvider'

import { SITE_NAME } from '@/lib/constants'
import { fontVariables } from '@/lib/googleFonts'
import { tv } from '@/lib/tailwind/variants'

const siteName = SITE_NAME
const description = 'さかなになりたいね'
const productionURL = 'https://trpfrog.net'

export const metadata: Metadata = {
  metadataBase: new URL('https://trpfrog.net'),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    locale: 'ja-JP',
    url: productionURL,
    siteName,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TrpFrog',
    creator: '@TrpFrog',
  },
  alternates: {
    canonical: productionURL,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#66a928' },
    { media: '(prefers-color-scheme: dark)', color: '#4f831f' },
  ],
  colorScheme: 'light dark',
}

const styles = tv({
  slots: {
    body: 'tw-scroll-smooth tw-bg-body-color tw-text-text-color print:tw-bg-white',
    layout: 'tw-flex tw-min-h-screen tw-flex-col',
    main: 'tw-flex-1',
  },
})()

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <head>
        <Favicon />
        <FixTooLargeFontAwesomeIcons />
      </head>
      <body className={styles.body({ className: fontVariables })}>
        <JotaiProvider>
          <Toaster />
          <div className={styles.layout()}>
            <Header />
            <Navigation />
            <main className={styles.main()}>{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <Suspense>
            <CommentToolbar />
          </Suspense>
        </JotaiProvider>
      </body>
    </html>
  )
}
