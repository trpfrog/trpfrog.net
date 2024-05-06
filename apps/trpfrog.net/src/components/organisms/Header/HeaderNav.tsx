import * as React from 'react'

import { DominoText } from '@/components/atoms/DominoText'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

const topLinks = [
  { href: '/', label: 'home' },
  { href: '/works', label: 'works' },
  { href: '/blog', label: 'blog' },
] as const

const styles = tv({
  slots: {
    navigation: 'tw-mx-4 tw-flex tw-font-palanquin-dark tw-text-2xl sp:tw-hidden',
    link: [
      'tw-select-none tw-text-white hover:tw-text-trpfrog-200',
      'tw-ml-3 tw-pl-3 first:tw-m-0 first:tw-p-0 tw-pb-1',
      'tw-border-l-2 tw-border-l-white first:tw-border-none',
    ],
  },
})()

export const HeaderNav = React.memo(function HeaderNav() {
  return (
    <nav className={styles.navigation()}>
      {topLinks.map(({ href, label }) => (
        <A key={href} href={href} className={styles.link()}>
          <DominoText text={label} />
        </A>
      ))}
    </nav>
  )
})
