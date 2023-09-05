import { Head, Html, Main, NextScript } from 'next/document'

import Favicon from '@/components/head/Favicon'
import GoogleFonts from '@/components/head/GoogleFonts'

import fontVariables from '@/lib/googleFonts'

const MyDocument = () => {
  return (
    <Html lang="ja-JP">
      <Head>
        <meta charSet="utf-8" />
        <GoogleFonts />
        <Favicon />
      </Head>
      <body className={fontVariables}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
