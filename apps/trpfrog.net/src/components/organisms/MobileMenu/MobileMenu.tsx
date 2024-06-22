import { memo } from 'react'

import Link from 'next/link'
import { RichButton } from 'src/components/atoms/RichButton'

import { Details } from '@/components/atoms/Details'
import { plainBlockStyle } from '@/components/atoms/PlainBlock'
import { MobileMenuBkg } from '@/components/organisms/MobileMenu/MobileMenuBkg'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'

import { tv } from '@/lib/tailwind/variants'

import { useToggleMenuCallback } from './hooks'
import { Settings } from './Settings'

const styles = tv({
  slots: {
    menu: `
      tw-relative tw-mt-8
      tw-w-fit before:tw-absolute before:-tw-top-9 before:tw-right-5
      before:tw-z-[250] before:tw-ml-0 before:tw-border-[0.9rem]
      before:tw-border-b-[2rem] before:tw-border-transparent
      before:tw-border-b-window-color before:tw-content-['']
      sp:tw-mt-2 sp:before:tw-hidden pc:-tw-right-[17.5px]
      print:tw-hidden
    `,
    window: plainBlockStyle({
      className: 'tw-flex tw-flex-col tw-gap-3 tw-rounded-lg tw-p-4 sp:tw-w-full',
    }),
    links: 'tw-grid tw-grid-cols-2 tw-gap-x-2 tw-gap-y-2.5',
  },
})()

export const MobileMenu = memo(function MobileMenu() {
  const toggleMenu = useToggleMenuCallback()

  return (
    <MobileMenuBkg>
      <aside className={styles.menu()}>
        <div className={styles.window()}>
          <div className={styles.links()} onClick={toggleMenu}>
            {NAVIGATION_LINKS.map(({ link, name }) => (
              <RichButton as={Link} href={link} key={link}>
                {name}
              </RichButton>
            ))}
          </div>
          <Details summary="高度な設定" className="">
            <Settings />
          </Details>
        </div>
      </aside>
    </MobileMenuBkg>
  )
})
