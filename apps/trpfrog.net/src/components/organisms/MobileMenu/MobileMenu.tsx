import classNames from 'classnames'
import Link from 'next/link'

import { Details } from '@/components/atoms/Details'
import { PlainBlock } from '@/components/atoms/PlainBlock'
import { RichButton } from '@/components/atoms/RichButton'
import { MobileMenuBkg } from '@/components/organisms/MobileMenu/MobileMenuBkg'
import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'

import { Settings } from './Settings'

function SpeechBubbleContainer(props: {
  children: React.ReactNode
  isOpened?: boolean
  ref?: React.RefObject<HTMLDivElement | null>
}) {
  const styles = classNames(
    'tw:relative tw:mt-8 tw:w-fit',
    'tw:before:absolute tw:before:-top-9 tw:before:right-5 tw:before:z-250 tw:before:ml-0',
    'tw:before:border-[0.9rem] tw:before:border-b-[2rem]',
    'tw:before:border-transparent tw:before:border-b-window-color',
    'tw:before:content-[""]',
    'tw:sp:mt-2 tw:sp:before:hidden tw:pc:-right-[17.5px]',
    'tw:print:hidden',
  )
  return (
    <aside className={styles} aria-modal={props.isOpened} aria-label="詳細メニュー" ref={props.ref}>
      <PlainBlock className="tw:flex tw:flex-col tw:gap-3 tw:rounded-lg tw:p-4 tw:sp:w-full">
        {props.children}
      </PlainBlock>
    </aside>
  )
}

export function MobileMenu(props: {
  ref?: React.RefObject<HTMLDivElement | null>
  isMenuOpened: boolean
}) {
  return (
    <div inert={!props.isMenuOpened}>
      <MobileMenuBkg isOpened={props.isMenuOpened}>
        <SpeechBubbleContainer isOpened={props.isMenuOpened} ref={props.ref}>
          <div className="tw:grid tw:grid-cols-2 tw:gap-x-2 tw:gap-y-2.5">
            {NAVIGATION_LINKS.map(({ link, name }) => (
              <RichButton as={Link} href={link} key={link}>
                {name}
              </RichButton>
            ))}
          </div>
          <Details summary="高度な設定">
            <Settings />
          </Details>
        </SpeechBubbleContainer>
      </MobileMenuBkg>
    </div>
  )
}
