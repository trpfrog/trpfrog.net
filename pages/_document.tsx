import {Head, Html, Main, NextScript} from 'next/document';
import Favicon from '../components/head/Favicon'
import fontVariables from "../lib/googleFonts";

const MyDocument = () => {
  return (
    <Html lang="ja-JP">
      <Head>
        <meta charSet="utf-8"/>
        <Favicon/>
      </Head>
      <body className={fontVariables}>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}

export default MyDocument;
