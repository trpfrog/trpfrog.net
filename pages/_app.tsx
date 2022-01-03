import '../styles/globals.scss'
import type {AppProps} from 'next/app'

// Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const TrpFrogNet = ({Component, pageProps}: AppProps) => {
    return <Component {...pageProps} />
}

export default TrpFrogNet
