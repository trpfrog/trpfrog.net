'use client'

import { Suspense } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'
import { getFirstPath } from '@/components/organisms/Navigation/utils'

import { tv } from '@/lib/tailwind/variants.ts'

const createKawaiiLogoStyles = tv({
  slots: {
    logo: 'tw-flex tw-items-center tw-gap-1.5',
    svgLogo: 'tw-h-[55px] sp:tw-h-[43px] hover:tw-brightness-95',
    subtitle: [
      'tw-font-palanquin-dark tw-font-bold tw-text-2xl tw-text-yellow-500',
      'tw-translate-y-1 sp:tw-translate-y-0.5 hover:tw-brightness-95',
    ],
  },
})

export type KawaiiLogoSubtitle = {
  label: string
  href: string
}

type Props = {
  subtitle?: KawaiiLogoSubtitle
}

function createSubtitle(pathname: string | null): KawaiiLogoSubtitle | undefined {
  const firstPath = getFirstPath(pathname)
  if (!firstPath) {
    return undefined
  }
  const pageInfo = NAVIGATION_LINKS.find(({ link }) => link === firstPath)
  if (!pageInfo || pageInfo.link === '/') {
    return undefined
  }
  return {
    label: pageInfo.shortName ?? pageInfo.name,
    href: pageInfo.link,
  }
}

function InternalKawaiiLogo({ subtitle }: Props) {
  const styles = createKawaiiLogoStyles()
  return (
    <div className={styles.logo()}>
      <Link href="/">
        <img src="/images/kawaii.svg" alt="つまみネット" className={styles.svgLogo()} />
      </Link>
      {subtitle && (
        <Link
          href={subtitle.href}
          className={styles.subtitle()}
          style={{
            WebkitTextStroke: '5px white',
            paintOrder: 'stroke fill',
          }}
        >
          {subtitle.label}
        </Link>
      )}
    </div>
  )
}

function ClientKawaiiLogo() {
  const pathname = usePathname()
  const subtitle = createSubtitle(pathname)
  return <InternalKawaiiLogo subtitle={subtitle} />
}

export function KawaiiLogo() {
  return (
    <Suspense fallback={<InternalKawaiiLogo />}>
      <ClientKawaiiLogo />
    </Suspense>
  )
}
