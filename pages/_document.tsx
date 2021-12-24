import { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/Favicon'
import WebFont from "../components/WebFont";

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