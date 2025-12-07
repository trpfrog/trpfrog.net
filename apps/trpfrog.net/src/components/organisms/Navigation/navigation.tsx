'use client'

import { Suspense } from 'react'

import { usePathname } from 'next/navigation'

import { WavyText } from '@/components/atoms/WavyText'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'

import { NAVIGATION_LINKS } from './navigation-links'
import { PathString } from './types'
import { getFirstPath } from './utils'

const styles = {
  wrapper: tv({
    base: 'tw:w-full tw:bg-[#81bd4a] tw:p-2 tw:sp:hidden tw:dark:bg-trpfrog-700',
  }),
  nav: tv({
    base: ['tw:m-auto tw:w-full tw:max-w-[980px]', 'tw:flex tw:items-center tw:justify-between'],
  }),
  link: tv({
    base: [
      'tw:inline-block tw:rounded-full tw:px-4 tw:duration-1200 tw:font-palanquin-dark',
      'tw:focus-visible:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-white',
    ],
    variants: {
      current: {
        true: `tw:bg-white tw:text-[#81bd4a] tw:hover:bg-white/80 tw:dark:text-trpfrog-700`,
        false: 'tw:text-white tw:hover:bg-white/20',
      },
    },
    defaultVariants: {
      current: false,
    },
  }),
}

function InternalNavigation(props: { pathname: PathString | null }) {
  const { pathname } = props

  return (
    <div className={styles.wrapper()}>
      <nav className={styles.nav()} aria-label="サイト全体の簡易ナビゲーション">
        {NAVIGATION_LINKS.filter(({ showOnNavBar = true }) => showOnNavBar).map(
          ({ link, name, shortName }) => (
            <A href={link} key={link} className={styles.link({ current: pathname === link })}>
              <WavyText text={shortName ?? name} />
            </A>
          ),
        )}
      </nav>
    </div>
  )
}

export function ClientNavigation() {
  const rawPathname = usePathname()
  const currentPath = getFirstPath(rawPathname)
  return <InternalNavigation pathname={currentPath} />
}

export function Navigation() {
  return (
    // usePathname requires a Suspense boundary, so we provide a fallback here
    <Suspense fallback={<InternalNavigation pathname={null} />}>
      <InternalNavigation pathname={null} />
    </Suspense>
  )
}
