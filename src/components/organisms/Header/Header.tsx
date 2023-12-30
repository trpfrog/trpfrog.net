import * as React from 'react'
import { useMemo } from 'react'

import { tv } from 'tailwind-variants'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import { MobileMenu } from '@/components/organisms/MobileMenu'

import { HeaderNav } from './HeaderNav'

const createStyles = tv({
  slots: {
    wrapper: 'tw-z-[999] tw-h-[var(--header-height)] tw-w-full tw-ease-out',
    header: 'tw-h-full tw-overflow-clip tw-bg-header-color',
    inside: 'tw-flex tw-h-full tw-items-center tw-justify-between',
    nav_wrapper: 'tw-flex',
  },
  variants: {
    sticky: {
      true: {
        wrapper: 'tw-sticky tw-top-0 tw-duration-200',
      },
      false: {
        wrapper: 'tw-translate-y-[-110%] tw-duration-100',
      },
    },
  },
})

type Props = {
  title?: React.ReactNode
}

export const Header = React.memo(function Header(props: Props) {
  const { visible } = useHeaderStatus()
  const styles = useMemo(() => createStyles({ sticky: visible }), [visible])

  return (
    <>
      <div className={styles.wrapper()}>
        <header className={styles.header()}>
          <MainWrapper
            className={styles.inside()}
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            <div className="tw-w-fit">
              <SiteNameWithIcon />
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
