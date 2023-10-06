import Link from 'next/link'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { OpenInNewTab } from '@/components/atoms/OpenInNewTab'

import styles from './index.module.scss'

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <MainWrapper id={styles.inner_footer}>
        <div id={styles.copyright}>&copy; 2019-2023 つまみ</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <OpenInNewTab
            href={'https://github.com/trpfrog/trpfrog.net'}
            className={styles.footer_button}
          >
            GitHub
          </OpenInNewTab>
          <Link href={'/legal'} className={styles.footer_button}>
            Legal
          </Link>
        </div>
      </MainWrapper>
    </footer>
  )
}

export default Footer
