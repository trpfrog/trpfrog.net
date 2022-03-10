import '../styles/globals.scss'
import type {AppProps} from 'next/app'

// Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Framer Motion
import { AnimatePresence } from "framer-motion";
import {DefaultSeo} from "next-seo";
import SEO from '../next-seo.config';
import {useTransitionFix} from "../lib/useTransitionFix";

const TrpFrogNet = ({Component, pageProps, router }: AppProps) => {
    const transitionCallback = useTransitionFix()
    return (
        <>
            <DefaultSeo {...SEO}/>
            <AnimatePresence exitBeforeEnter onExitComplete={transitionCallback}>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </>
    )
}

export default TrpFrogNet
