import type { Metadata } from 'next';
import React from "react";
import '../styles/globals.scss';
import fontVariables from "../lib/googleFonts";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import Favicon from "../components/head/Favicon";
import Analytics from "../components/Analytics";
import FixTooLargeFontAwesomeIcons from "../components/utils/FixTooLargeFontAwesomeIcons";
import GoogleFonts from "../components/GoogleFonts";

export const metadata: Metadata = {
  title: {
    default: process.env.title as string,
    template: '%s - つまみネット',
  },
  openGraph: {
    locale: 'ja-JP',
    url: 'https://trpfrog.net',
    siteName: 'つまみネット',
    images: [
      {
        url: 'https://res.cloudinary.com/trpfrog/TwitterCard',
        alt: 'Og Image Alt',
      }
    ]
  },
  twitter: {
    site: '@TrpFrog',
  }
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="ja">
      <head>
        <Analytics/>
        <Favicon/>
        <GoogleFonts/>
        <FixTooLargeFontAwesomeIcons/>
      </head>
      <body className={fontVariables}>
        <Header/>
        <Navigation/>
        <main>
          {children}
        </main>
        <BackToTop/>
        <Footer/>
      </body>
    </html>
  )
}

