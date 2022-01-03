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

const TrpFrogNet = ({Component, pageProps, router }: AppProps) => {
    return (
        <>
            <DefaultSeo {...SEO}/>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </>
    )
}

export default TrpFrogNet
