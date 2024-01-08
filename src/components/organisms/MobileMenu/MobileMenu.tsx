import { memo } from 'react'

import { Details } from '@/components/atoms/Details'
import { MagicButton } from '@/components/atoms/MagicButton'
import { plainBlockStyle } from '@/components/atoms/PlainBlock'
import { MobileMenuBkg } from '@/components/organisms/MobileMenu/MobileMenuBkg'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'

import { tv } from '@/lib/tailwind/variants'

import { useToggleMenuCallback } from './hooks'
import { Settings } from './Settings'

const styles = tv({
  slots: {
    menu: `
      tw-m-3 before:tw-absolute before:-tw-top-1
      before:tw-right-[2.6rem] before:tw-z-[250] before:tw-ml-0
      before:tw-border-[0.9rem] before:tw-border-b-[2rem] 
      before:tw-border-transparent before:tw-border-b-window-color
      before:tw-content-[''] sp:before:tw-hidden
      pc:tw-mx-4 pc:tw-my-8
    `,
    window: plainBlockStyle({
      className:
        'tw-flex tw-flex-col tw-gap-3 tw-rounded-lg tw-p-4 sp:tw-w-full',
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
              <MagicButton href={link} key={link}>
                {name}
              </MagicButton>
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
