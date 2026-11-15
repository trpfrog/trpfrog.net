import { Suspense, useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { Popover } from '@ui-sdk/react/popover'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { KawaiiLogo } from '@/components/organisms/Header/KawaiiLogo'
import { SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import {
  MobileMenu,
  useIsMobileMenuOpened,
  useSetMobileMenuOpened,
} from '@/components/organisms/MobileMenu'
import { tv } from '@/lib/tailwind'
import { useIsKawaiiLogo } from '@/states/userSettings'

import { HeaderNav } from './HeaderNav'

const createStyles = tv({
  slots: {
    wrapper: 'tw:z-999 tw:h-(--header-height) tw:w-full tw:ease-out',
    header: 'tw:h-full tw:overflow-clip tw:bg-header-color',
    inside: 'tw:relative tw:flex tw:h-full tw:items-center tw:justify-between',
    // メニューを元の位置に出すための目印。スマホではヘッダーの幅いっぱいに 8px 下、
    // PC では 32px 下で右に 17.5px はみ出す。PC の幅は吹き出しの矢印が右端から
    // 34px (ハンバーガーの真下) に来るように決めている
    menuAnchor: [
      'tw:pointer-events-none tw:absolute tw:top-full tw:right-0 tw:h-0 tw:w-full tw:mt-2',
      'tw:pc:-right-[17.5px] tw:pc:mt-8 tw:pc:w-[68px]',
    ],
    nav_wrapper: 'tw:flex',
  },
  variants: {
    sticky: {
      true: {
        wrapper: 'tw:sticky tw:top-0 tw:print:static',
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
        wrapper: 'tw:duration-200',
      },
    },
    {
      sticky: true,
      visible: false,
      class: {
        wrapper: 'tw:-translate-y-full tw:duration-100',
      },
    },
    {
      sticky: true,
      scrolled: true,
      class: {
        header: 'tw:shadow-md',
      },
    },
  ],
})

type Props = {
  title?: React.ReactNode
}

function InternalHeader(props: {
  kawaii?: boolean
  sticky?: boolean
  visible?: boolean
  visibleShadow?: boolean
  visibleTrpFrog?: boolean
  visibleSubtitle?: boolean
  pathname?: string
}) {
  const {
    kawaii = false,
    sticky = false,
    visible = false,
    visibleShadow = false,
    visibleTrpFrog = false,
    visibleSubtitle = false,
    pathname = '/',
  } = props
  const isMenuOpened = useIsMobileMenuOpened()
  const setMenuOpened = useSetMobileMenuOpened()

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
    <Popover open={isMenuOpened} onOpenChange={setMenuOpened} modal>
      <div className={styles.wrapper()}>
        <header className={styles.header()}>
          <MainWrapper className={styles.inside()} style={{ marginTop: 0, marginBottom: 0 }}>
            <div className="tw:w-fit">
              {kawaii ? (
                <KawaiiLogo />
              ) : (
                <SiteNameWithIcon
                  visibleSubtitle={visibleSubtitle}
                  visibleTrpFrog={visibleTrpFrog}
                  pathname={pathname}
                />
              )}
            </div>
            <div className={styles.nav_wrapper()}>
              <HeaderNav />
              <Hamburger />
            </div>
            <div aria-hidden data-mobile-menu-anchor className={styles.menuAnchor()} />
          </MainWrapper>
        </header>
      </div>
      <MobileMenu />
    </Popover>
  )
}

function ClientHeader() {
  const kawaii = useIsKawaiiLogo()
  const { sticky, visible, visibleShadow, visibleTrpFrog, visibleSubtitle } = useHeaderStatus()
  const pathname = usePathname() ?? '/'
  return (
    <InternalHeader
      kawaii={kawaii}
      sticky={sticky}
      visible={visible}
      visibleShadow={visibleShadow}
      visibleTrpFrog={visibleTrpFrog}
      visibleSubtitle={visibleSubtitle}
      pathname={pathname}
    />
  )
}

export function Header(_props: Props) {
  return (
    // useHeaderStatus requires a Suspense boundary, so we provide a fallback here
    <Suspense
      fallback={<InternalHeader visible sticky visibleShadow visibleTrpFrog visibleSubtitle />}
    >
      <ClientHeader />
    </Suspense>
  )
}
