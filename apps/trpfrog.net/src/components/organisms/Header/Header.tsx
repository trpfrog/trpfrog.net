import * as React from 'react'
import { Suspense, useMemo } from 'react'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { KawaiiLogoOrNot, SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import { MobileMenu } from '@/components/organisms/MobileMenu'

import { tv } from '@/lib/tailwind/variants'

import { HeaderNav } from './HeaderNav'

const createStyles = tv({
  slots: {
    wrapper: 'tw-z-[999] tw-h-header tw-w-full tw-ease-out',
    header: 'tw-h-full tw-overflow-clip tw-bg-header-color',
    inside: 'tw-flex tw-h-full tw-items-center tw-justify-between',
    nav_wrapper: 'tw-flex',
  },
  variants: {
    sticky: {
      true: {
        wrapper: 'tw-sticky tw-top-0',
      },
    },
    visible: { true: '' },
    scrolled: { true: '' },
  },
  compoundVariants: [
    {
      sticky: true,
      visible: true,
      class: {
        wrapper: 'tw-duration-200',
      },
    },
    {
      sticky: true,
      visible: false,
      class: {
        wrapper: 'tw-translate-y-[-100%] tw-duration-100',
      },
    },
    {
      sticky: true,
      scrolled: true,
      class: {
        header: 'tw-shadow-md',
      },
    },
  ],
})

type Props = {
  title?: React.ReactNode
}

export const Header = React.memo(function Header(props: Props) {
  const { sticky, visible, visibleShadow } = useHeaderStatus()

  const styles = useMemo(
    () =>
      createStyles({
        sticky,
        visible,
        scrolled: visibleShadow,
      }),
    [sticky, visible, visibleShadow],
  )

  return (
    <>
      <div className={styles.wrapper()}>
        <header className={styles.header()}>
          <MainWrapper className={styles.inside()} style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="tw-w-fit">
              {/* TODO: あまり賢い方法ではないのでどうにかする */}
              <Suspense fallback={<SiteNameWithIcon />}>
                <KawaiiLogoOrNot>
                  <SiteNameWithIcon />
                </KawaiiLogoOrNot>
              </Suspense>
            </div>
            <div className={styles.nav_wrapper()}>
              <HeaderNav />
              <Hamburger />
            </div>
          </MainWrapper>
        </header>
      </div>
      <MobileMenu />
    </>
  )
})
