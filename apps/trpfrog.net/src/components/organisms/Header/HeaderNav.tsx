import * as React from 'react'

import { WavyText } from '@/components/atoms/WavyText'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind'

const topLinks = [
  { href: '/', label: 'home' },
  { href: '/works', label: 'works' },
  { href: '/blog', label: 'blog' },
] as const

const styles = tv({
  slots: {
    navigation: 'tw:mx-4 tw:flex tw:font-palanquin-dark tw:text-2xl tw:sp:hidden',
    link: [
      'tw:select-none tw:text-white tw:hover:text-trpfrog-200',
      'tw:first:m-0 tw:first:p-0 tw:pb-1',
      'tw:border-l-2 tw:border-l-white tw:first:border-none',
    ],
  },
})()

export const HeaderNav = React.memo(function HeaderNav() {
  return (
    <nav className={styles.navigation()}>
      {topLinks.map(({ href, label }) => (
        <div className={styles.link()} key={href}>
          <A href={href} className="tw:px-2 tw:focus-visible:ring-2 tw:focus-visible:ring-white">
            <WavyText text={label} />
          </A>
        </div>
      ))}
    </nav>
  )
})
