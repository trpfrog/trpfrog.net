import { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/head/Favicon'
import WebFont from "../components/head/WebFont";

const MyDocument = () => {
    return (
        <Html lang="ja-JP">
            <Head>
                <meta charSet="utf-8" />
                <Favicon />
                <WebFont />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;