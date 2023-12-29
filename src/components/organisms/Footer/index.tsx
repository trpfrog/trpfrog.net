import { MainWrapper } from '@/components/atoms/MainWrapper'
import { A } from '@/components/wrappers'

import styles from './index.module.scss'

export const Footer = () => {
  return (
    <footer id={styles.footer}>
      <MainWrapper id={styles.inner_footer}>
        <div id={styles.copyright}>&copy; 2019-2023 つまみ</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <A
            openInNewTab
            href={'https://github.com/trpfrog/trpfrog.net'}
            className={styles.footer_button}
          >
            GitHub
          </A>
          <A href={'/legal'} className={styles.footer_button}>
            Legal
          </A>
        </div>
      </MainWrapper>
    </footer>
  )
}
