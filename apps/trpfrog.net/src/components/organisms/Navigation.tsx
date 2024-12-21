'use client'
import { usePathname } from 'next/navigation'

import { WavyText } from '@/components/atoms/WavyText'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

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
  { link: '/balloon', name: 'Balloons' },
  { link: '/environment', name: 'Environment', shortName: 'Env' },
  { link: '/stickers', name: 'Stickers' },
  { link: '/icons', name: 'Icons' },
  { link: '/ai-icons', name: 'AI Generated Icons', shortName: 'AI Icons' },
  { link: '/links', name: 'Links', showOnNavBar: false },
  { link: '/download', name: 'Downloads', shortName: 'DLC' },
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
    base: 'tw-w-full tw-bg-[#81bd4a] tw-p-2 sp:tw-hidden dark:tw-bg-trpfrog-700',
  }),
  nav: tv({
    base: ['tw-m-auto tw-w-full tw-max-w-[980px]', 'tw-flex tw-items-center tw-justify-between'],
  }),
  link: tv({
    base: [
      'tw-inline-block tw-rounded-full tw-px-4 tw-duration-1200 tw-font-palanquin-dark',
      'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white',
    ],
    variants: {
      current: {
        true: `tw-bg-white tw-text-[#81bd4a] hover:tw-bg-white/80 dark:tw-text-trpfrog-700`,
        false: 'tw-text-white hover:tw-bg-white/20',
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
      <nav className={styles.nav()} aria-label="簡易ナビゲーション">
        {NAVIGATION_LINKS.filter(({ showOnNavBar = true }) => showOnNavBar).map(
          ({ link, name, shortName }) => (
            <A href={link} key={link} className={styles.link({ current: currentLink === link })}>
              <WavyText text={shortName ?? name} />
            </A>
          ),
        )}
      </nav>
    </div>
  )
}
