import React, { Suspense } from 'react'

import '@/styles/globals.scss'
import type { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import Analytics from '@/components/head/Analytics'
import Favicon from '@/components/head/Favicon'
import GoogleFonts from '@/components/head/GoogleFonts'
import { BackToTop } from '@/components/organisms/BackToTop'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { Navigation } from '@/components/organisms/Navigation'
import { CommentToolbar } from '@/components/utils/CommentToolbar'
import { FixTooLargeFontAwesomeIcons } from '@/components/utils/FixTooLargeFontAwesomeIcons'
import { JotaiProvider } from '@/components/utils/JotaiProvider'

import { SITE_NAME } from '@/lib/constants'
import fontVariables from '@/lib/googleFonts'

import styles from './layout.module.scss'

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
    title: SITE_NAME,
    description,
    site: '@TrpFrog',
    creator: '@TrpFrog',
  },
  alternates: {
    canonical: productionURL,
  },
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <head>
        <Analytics />
        <Favicon />
        <GoogleFonts />
        <FixTooLargeFontAwesomeIcons />
      </head>
      <body className={`${fontVariables} ${styles.body}`}>
        <JotaiProvider>
          <Toaster />
          <div className={styles.layout}>
            <Header />
            <Navigation />
            <main>{children}</main>
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
