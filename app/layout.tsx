import type { Metadata } from 'next';
import React from "react";
import '../styles/globals.scss';
import Header from "../components/header/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BackToTop from "../components/blog/BackToTop";
import {M_PLUS_Rounded_1c} from "next/font/google";


export const metadata: Metadata = {
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
      <head/>
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

