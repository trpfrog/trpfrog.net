import classNames from 'classnames'
import { Cookie } from 'next/font/google'

import { A } from '@/components/wrappers'

import styles from './buy-me-a-coffee.module.scss'
import { CoffeeLogo } from './coffee-logo'

const cookieFont = Cookie({
  subsets: ['latin'],
  weight: '400',
})

export function BuyMeACoffee() {
  return (
    <div className={styles.bmc_btn}>
      <A href="https://buymeacoffee.com/trpfrog">
        <CoffeeLogo />
        <span className={classNames(styles.bmc_btn_text, cookieFont.className)}>
          Buy me a coffee
        </span>
      </A>
    </div>
  )
}
