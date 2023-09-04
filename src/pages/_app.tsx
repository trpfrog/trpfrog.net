import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

// Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// Framer Motion
import { AnimatePresence } from 'framer-motion'

import Analytics from '@/components/head/Analytics'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

config.autoAddCss = false

const usePathChangeRecorder = () => {
  const router = useRouter()

  useEffect(() => {
    // unmount only
    const storage = globalThis?.sessionStorage
    if (!storage) return
    const prevPath = storage.getItem('currentPath')
    const curPath = globalThis.location.pathname

    if (prevPath == curPath) return

    storage.setItem('prevPath', prevPath ? prevPath : '')
    storage.setItem('currentPath', curPath)
  }, [router.asPath])
}

const TrpFrogNet = ({ Component, pageProps, router }: AppProps) => {
  usePathChangeRecorder()
  const preventScrollAnimation = () => window.scrollTo(0, 0)
  return (
    <>
      <Analytics />
      <AnimatePresence mode="wait" onExitComplete={preventScrollAnimation}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}

export default TrpFrogNet
