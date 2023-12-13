'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './index.module.scss'

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

export const NavigationLinks = () => {
  const pathname = usePathname()
  const currentLink = pathname?.split('/').slice(0, 2).join('/')

  return (
    <>
      {NAVIGATION_LINKS.filter(({ showOnNavBar = true }) => showOnNavBar).map(
        ({ link, name, shortName }) => (
          <Link
            href={link}
            key={link}
            className={styles.side_menu_link}
            data-current-page={currentLink === link}
          >
            {shortName ?? name}
          </Link>
        ),
      )}
    </>
  )
}

export const Navigation = () => {
  return (
    <>
      <nav id={styles.wide_nav}>
        <div id={styles.wide_nav_wrapper}>
          <NavigationLinks />
        </div>
      </nav>
    </>
  )
}
