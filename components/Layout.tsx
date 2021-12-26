import Link from 'next/link'
import React from "react";
import Head from 'next/head'

import Header from './Header'
import Footer from "./Footer";
import TwitterCard from "./head/TwitterCard";
import Navigation from "./Navigation";

type Props = {
    hasMargin?: boolean
}

const Layout: React.FunctionComponent<Props> = ({
    children, hasMargin = true
}) => {
    return (
        <>
            <body>
                <Header/>
                <Navigation/>
                <main style={{margin: (hasMargin ? '2em' : '0')}}>
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