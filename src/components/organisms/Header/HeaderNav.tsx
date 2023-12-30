import * as React from 'react'

import { tv } from 'tailwind-variants'

import { A } from '@/components/wrappers'

const topLinks = [
  { href: '/', label: 'home' },
  { href: '/works', label: 'works' },
  { href: '/blog', label: 'blog' },
] as const

const styles = tv({
  slots: {
    navigation: 'tw-mx-4 tw-flex tw-font-comfortaa tw-text-2xl sp:tw-hidden',
    link: [
      'tw-select-none tw-text-white hover:tw-text-trpfrog-200',
      'tw-ml-2.5 tw-pl-2.5 first:tw-m-0 first:tw-p-0',
      'tw-border-l-2 tw-border-l-white first:tw-border-none',
    ],
  },
})()

export function HeaderNav() {
  return (
    <nav className={styles.navigation()}>
      {topLinks.map(({ href, label }) => (
        <A key={href} href={href} className={styles.link()}>
          {label}
        </A>
      ))}
    </nav>
  )
}
