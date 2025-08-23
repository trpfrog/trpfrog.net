import { ReactNode, useMemo } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrayValues } from 'type-fest'

import { NAVIGATION_LINKS } from '@/components/organisms/Navigation.tsx'

import { tv } from '@/lib/tailwind/variants.ts'

import { useIsKawaiiLogo } from '@/states/kawaiiLogoAtom.ts'

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

function usePageInfo(): ArrayValues<typeof NAVIGATION_LINKS> | undefined {
  const pathname = usePathname()
  const firstPath = '/' + (pathname.split('/')[1] ?? '')
  return useMemo(() => NAVIGATION_LINKS.find(link => link.link === firstPath), [firstPath])
}

// TODO:
// useIsKawaiiLogo は Suspense で wrap する必要があるのでコンポーネントを分けたが、
// 正直この方法で良いのかわからないので調査する
export function KawaiiLogoOrNot(props: { children: ReactNode }) {
  const isKawaii = useIsKawaiiLogo()
  const pageInfo = usePageInfo()
  const styles = createKawaiiLogoStyles()
  if (isKawaii) {
    return (
      <div className={styles.logo()}>
        <Link href="/">
          <img src="/images/kawaii.svg" alt="つまみネット" className={styles.svgLogo()} />
        </Link>
        {pageInfo && pageInfo.link !== '/' && (
          <Link
            href={pageInfo.link}
            className={styles.subtitle()}
            style={{
              WebkitTextStroke: '5px white',
              paintOrder: 'stroke fill',
            }}
          >
            {pageInfo.shortName ?? pageInfo.name}
          </Link>
        )}
      </div>
    )
  } else {
    return props.children
  }
}
