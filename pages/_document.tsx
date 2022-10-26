import { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/head/Favicon'
import GoogleFonts from "../components/GoogleFonts";

const MyDocument = () => {
  return (
    <Html lang="ja-JP">
      <Head>
        <meta charSet="utf-8" />
        <Favicon />
        <GoogleFonts/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
