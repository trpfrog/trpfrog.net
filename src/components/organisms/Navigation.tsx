'use client'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

import { A } from '@/components/wrappers'

type NavigationLinkRecord = {
  link: string
  name: string
  shortName?: string
  showOnNavBar?: boolean
}

export const NAVIGATION_LINKS: NavigationLinkRecord[] = [
  { link: '/', name: 'Home' },
  { link: '/works', name: 'Works' },
  { link: '/blog', name: 'Blog' },
  { link: '/tweets', name: 'Tweets' },
  { link: '/balloon', name: 'Balloons' },
  { link: '/environment', name: 'Environment', shortName: 'Env' },
  { link: '/stickers', name: 'Stickers' },
  { link: '/icons', name: 'Icons' },
  { link: '/links', name: 'Links', showOnNavBar: false },
  { link: '/download', name: 'Downloads' },
  {
    link: '/icon-maker',
    name: 'Icon Maker',
    shortName: 'Maker',
    showOnNavBar: false,
  },
  { link: '/walking', name: 'Walking', shortName: 'Walk' },
]

const styles = {
  wrapper: tv({
    base: 'tw-w-full tw-bg-[#81bd4a] tw-py-2 sp:tw-hidden dark:tw-bg-trpfrog-700',
  }),
  nav: tv({
    base: [
      'tw-m-auto tw-w-full tw-max-w-[980px]',
      'tw-flex tw-items-center tw-justify-between',
    ],
  }),
  link: tv({
    base: 'tw-inline-block tw-rounded-full tw-px-4 tw-pt-1 tw-font-comfortaa',
    variants: {
      current: {
        true: 'tw-cursor-default tw-bg-white tw-text-[#81bd4a] dark:tw-text-trpfrog-700',
        false: 'tw-text-white hover:tw-bg-white/10',
      },
    },
    defaultVariants: {
      current: false,
    },
  }),
}

export function Navigation() {
  const pathname = usePathname()
  const currentLink = pathname?.split('/').slice(0, 2).join('/')
  return (
    <div className={styles.wrapper()}>
      <nav className={styles.nav()}>
        {NAVIGATION_LINKS.filter(({ showOnNavBar = true }) => showOnNavBar).map(
          ({ link, name, shortName }) =>
            currentLink !== link ? (
              <A href={link} key={link} className={styles.link()}>
                {shortName ?? name}
              </A>
            ) : (
              <div key={link} className={styles.link({ current: true })}>
                {shortName ?? name}
              </div>
            ),
        )}
      </nav>
    </div>
  )
}
