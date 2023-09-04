import type { Metadata } from 'next'
import React from 'react'
import '@/styles/globals.scss'
import fontVariables from '@/lib/googleFonts'
import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import Footer from '@/components/organisms/Footer'
import BackToTop from '@/components/organisms/BackToTop'
import Favicon from '@/components/head/Favicon'
import Analytics from '@/components/head/Analytics'
import FixTooLargeFontAwesomeIcons from '@/components/utils/FixTooLargeFontAwesomeIcons'
import GoogleFonts from '@/components/head/GoogleFonts'
import { Toaster } from 'react-hot-toast'
import { SITE_NAME } from '@/lib/constants'

const siteName = SITE_NAME
const description = 'さかなになりたいね'
const productionURL = 'https://trpfrog.net'

export const metadata: Metadata = {
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
      <body className={fontVariables}>
        <Toaster />
        <Header />
        <Navigation />
        <main>{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}
