import Link from 'next/link'
import React from "react";
import Head from 'next/head'

import Header from './Header'
import Footer from "./Footer";
import TwitterCard from "./head/TwitterCard";
import Navigation from "./Navigation";

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
                <Navigation/>
                <main>
                    <div id="main_wrapper">
                        {children}
                    </div>
                </main>
                <Footer/>
            </body>
        </>
    );
}

export default Layout;