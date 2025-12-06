import { Suspense, useMemo, useRef } from 'react'

import { usePathname } from 'next/navigation'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Hamburger } from '@/components/molecules/Hamburger'
import { KawaiiLogo } from '@/components/organisms/Header/KawaiiLogo'
import { SiteNameWithIcon } from '@/components/organisms/Header/SiteNameWithIcon'
import { useHeaderStatus } from '@/components/organisms/Header/useHeaderStatus'
import { MobileMenu, useMobileMenuState } from '@/components/organisms/MobileMenu'

import { useFocusTrap } from '@/hooks/useFocusTrap'

import { tv } from '@/lib/tailwind/variants'

import { HeaderNav } from './HeaderNav'

import { useIsKawaiiLogo } from '@/states/kawaiiLogoAtom'

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
        wrapper: 'tw-sticky tw-top-0 print:tw-static',
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
  const refCloseButton = useRef<HTMLDivElement>(null)
  const refMobileMenu = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useMobileMenuState()

  const focusableRefs = [refCloseButton, refMobileMenu]
  useFocusTrap(focusableRefs, isOpened, () => setIsOpened(false))

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
              <Hamburger ref={refCloseButton} />
            </div>
          </MainWrapper>
        </header>
      </div>
      <MobileMenu ref={refMobileMenu} isMenuOpened={isOpened} />
    </>
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
