import { ReactNode } from 'react'

import {
  useMobileMenuState,
  useToggleMenuCallback,
} from '@/components/organisms/MobileMenu/hooks'

import { tv } from '@/lib/tailwind/variants'

const createStyles = tv({
  slots: {
    wrapper: 'tw-fixed tw-inset-0 tw-z-[150]',
    background: 'tw-absolute tw-inset-0 tw-z-[150] tw-bg-black tw-duration-300',
    menuWrapper: `
      tw-absolute 
      tw-right-0 tw-top-[--header-height] tw-z-[151] 
      tw-duration-300 sp:tw-w-full 
    `,
  },
  variants: {
    opened: {
      true: {
        background: 'tw-opacity-70',
      },
      false: {
        wrapper: 'tw-pointer-events-none',
        background: '-tw-z-10 tw-opacity-0',
        menuWrapper: '-tw-translate-y-[150%]',
      },
    },
  },
})

interface MobileMenuBkgProps {
  children: ReactNode
}

export function MobileMenuBkg(props: MobileMenuBkgProps) {
  const doNothing = () => {}
  const toggleMenu = useToggleMenuCallback()
  const [isOpened] = useMobileMenuState()

  const styles = createStyles({ opened: isOpened })

  return (
    <section className={styles.wrapper()}>
      <aside
        className={styles.background()}
        onClick={isOpened ? toggleMenu : doNothing}
      />
      <div className={styles.menuWrapper()}>{props.children}</div>
    </section>
  )
}
