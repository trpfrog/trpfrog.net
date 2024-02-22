import { memo } from 'react'

import { tv } from 'tailwind-variants'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { A } from '@/components/wrappers'

const styles = tv({
  slots: {
    footer: 'tw-bg-trpfrog-700',
    inner: 'tw-my-2.5 tw-flex tw-items-center tw-justify-between',
    copyright:
      'tw-font-mplus-rounded tw-font-bold tw-text-white/70 pc:tw-text-lg',
    links: 'tw-space-x-2',
    link: [
      'tw-rounded-full tw-px-3 tw-py-0.5 tw-text-white/70 hover:tw-text-white/100',
      'tw-bg-trpfrog-500 tw-font-bold',
    ],
  },
})()

export const Footer = memo(function Footer() {
  return (
    <footer className={styles.footer()}>
      <MainWrapper className={styles.inner()}>
        <div className={styles.copyright()}>&copy; 2019-2024 つまみ</div>
        <div className={styles.links()}>
          <A
            openInNewTab
            href="https://github.com/trpfrog/trpfrog.net"
            className={styles.link()}
          >
            GitHub
          </A>
          <A href={'/legal'} className={styles.link()}>
            Legal
          </A>
        </div>
      </MainWrapper>
    </footer>
  )
})
