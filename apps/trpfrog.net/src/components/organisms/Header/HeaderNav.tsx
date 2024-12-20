import * as React from 'react'

import { WavyText } from '@/components/atoms/WavyText'
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
      'first:tw-m-0 first:tw-p-0 tw-pb-1',
      'tw-border-l-2 tw-border-l-white first:tw-border-none',
    ],
  },
})()

export const HeaderNav = React.memo(function HeaderNav() {
  return (
    <nav className={styles.navigation()}>
      {topLinks.map(({ href, label }) => (
        <div className={styles.link()} key={href}>
          <A href={href} className="tw-px-2 focus-visible:tw-ring-2 focus-visible:tw-ring-white">
            <WavyText text={label} />
          </A>
        </div>
      ))}
    </nav>
  )
})
