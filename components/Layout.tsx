import Link from 'next/link'
import React from "react";
import Head from 'next/head'

import Header from './Header'
import Footer from "./Footer";
import TwitterCard from "./TwitterCard";

type Props = {
    title?: string
    description?: string
}

const Layout: React.FunctionComponent<Props> = ({
    children, title, description = 'さかなになりたいね'
}) => {
    let pageTitle = process.env.title as string;
    if (title !== undefined) {
        pageTitle += ' - ' + title;
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <TwitterCard title={pageTitle} description={description} url={'https://trpfrog.net'} />
            </Head>
            <body>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </body>
        </>
    );
}

export default Layout;