import { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/head/Favicon'

const MyDocument = () => {
    return (
        <Html lang="ja-JP">
            <Head>
                <meta charSet="utf-8" />
                <Favicon />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;800&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;