import React, {useEffect} from "react";

import Header from './Header'
import Footer from "./Footer";
import Navigation, {NAVIGATION_LINKS} from "./Navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

import {motion} from "framer-motion";

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

type Props = {
    style: any;
}

const Layout: React.FunctionComponent<Props> = ({
    children, style
}) => {

    const router = useRouter();

    const storePathValues = () => {
        const storage = globalThis?.sessionStorage;
        if (!storage) return;
        const prevPath = storage.getItem("currentPath");
        const curPath = globalThis.location.pathname;
        // if (prevPath != curPath)
        {
            storage.setItem('prevPath', prevPath ? prevPath : '');
            storage.setItem('currentPath', globalThis.location.pathname);
        }
    }
    useEffect(() => storePathValues, [router.asPath]);

    let motionDirection = 0;
    if (process.browser) {
        const item = globalThis?.sessionStorage?.getItem('prevPath');
        if(item != null) {
            const prevPath  = item.split('/').slice(0, 2).join('/');
            const curPath   = router.pathname.split('/').slice(0, 2).join('/');
            const prevIndex = NAVIGATION_LINKS.findIndex((value => (value.link == prevPath)));
            const curIndex  = NAVIGATION_LINKS.findIndex((value => (value.link == curPath)));
            if(prevIndex != -1 && curIndex != -1 && prevIndex != curIndex) {
                motionDirection = prevIndex - curIndex < 0 ? -1 : 1;
            }
            console.log(prevPath + ' ' + curPath);
        }
    }

    const isMobile = process.browser && window.innerWidth < 800;

    return (
        <>
            <body>
                <Header/>
                <Navigation/>
                <main>
                    <motion.div
                        initial={
                            isMobile
                            ? {y: -motionDirection * 70, opacity: 0}
                            : {x: -motionDirection * 70, opacity: 0}
                        }
                        animate={
                            isMobile
                            ? {y: 0, opacity: 1}
                            : {x: 0, opacity: 1}
                        }
                        exit={
                            isMobile
                            ? {y: motionDirection * 70, opacity: 0}
                            : {x: motionDirection * 70, opacity: 0}
                        }
                        transition={{
                            duration: 0.4,
                            type: 'spring',
                            mass: 0.5
                        }}
                    >
                        <div id="main_wrapper" style={style}>
                            {children}
                        </div>
                    </motion.div>
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