import type { Metadata } from 'next';
import React from "react";
import '../styles/globals.scss';
import Header from "../components/header/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import {M_PLUS_Rounded_1c} from "next/font/google";
import GoogleFonts from "../components/GoogleFonts";
import Favicon from "../components/head/Favicon";
import Analytics from "../components/Analytics";
import FixTooLargeFontAwesomeIcons from "../components/utils/FixTooLargeFontAwesomeIcons";


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
        <GoogleFonts/>
        <Favicon/>
        <FixTooLargeFontAwesomeIcons/>
      </head>
      <body>
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

