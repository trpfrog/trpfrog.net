import Link from 'next/link'
import React from "react";
import Head from 'next/head'

import Header from './Header'
import Footer from "./Footer";
import TwitterCard from "./head/TwitterCard";
import Navigation from "./Navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

type Props = {
}

const Layout: React.FunctionComponent<Props> = ({
    children
}) => {
    return (
        <>
            <body>
                <Header/>
                <Navigation/>
                <main>
                    <div id="main_wrapper">
                        {children}
                    </div>
                </main>
                <div id="page_top" onClick={backToTop}>
                    <span id={'back-to-top-icon'}>
                        <FontAwesomeIcon icon={faAngleDoubleUp} />
                    </span>
                </div>
                <Footer/>
            </body>
        </>
    );
}

export default Layout;