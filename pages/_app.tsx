import '../styles/globals.scss'
import type {AppProps} from 'next/app'

// Font Awesome
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// Framer Motion
import {AnimatePresence} from "framer-motion";
import {DefaultSeo} from "next-seo";
import SEO from '../next-seo.config';
import {useTransitionFix} from "../lib/useTransitionFix";

// Progress Bar
import NextNProgress from "nextjs-progressbar";
import Analytics from "../components/Analytics";

config.autoAddCss = false

const TrpFrogNet = ({Component, pageProps, router}: AppProps) => {
  const transitionCallback = useTransitionFix()
  return (
    <>
      <DefaultSeo {...SEO}/>
      <Analytics/>
      <NextNProgress
        color="#90e200"
        startPosition={0.35}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
        options={{showSpinner: false}}
      />
      <AnimatePresence mode={'wait'} onExitComplete={transitionCallback}>
        <Component {...pageProps} key={router.route}/>
      </AnimatePresence>
    </>
  )
}

export default TrpFrogNet
