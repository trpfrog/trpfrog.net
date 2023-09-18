import Link from 'next/link'

import MainWrapper from '@/components/atoms/MainWrapper'

import styles from './index.module.scss'

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <MainWrapper id={styles.inner_footer}>
        <div id={styles.copyright}>&copy; 2019-2023 つまみ</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <a
            href={'https://github.com/trpfrog/trpfrog.net'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer_button}
          >
            GitHub
          </a>
          <Link href={'/legal'} className={styles.footer_button}>
            Legal
          </Link>
        </div>
      </MainWrapper>
    </footer>
  )
}

export default Footer
