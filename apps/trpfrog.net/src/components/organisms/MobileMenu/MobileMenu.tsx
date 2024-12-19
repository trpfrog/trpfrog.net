import { createPortal } from 'react-dom'

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
    'tw-relative tw-mt-8 tw-w-fit',
    'before:tw-absolute before:-tw-top-9 before:tw-right-5 before:tw-z-[250] before:tw-ml-0',
    'before:tw-border-[0.9rem] before:tw-border-b-[2rem]',
    'before:tw-border-transparent before:tw-border-b-window-color',
    'before:tw-content-[""]',
    'sp:tw-mt-2 sp:before:tw-hidden pc:-tw-right-[17.5px]',
    'print:tw-hidden',
  )
  return (
    <aside className={styles} aria-modal={props.isOpened} aria-label="詳細メニュー" ref={props.ref}>
      <PlainBlock className="tw-flex tw-flex-col tw-gap-3 tw-rounded-lg tw-p-4 sp:tw-w-full">
        {props.children}
      </PlainBlock>
    </aside>
  )
}

export function MobileMenu(props: {
  ref?: React.RefObject<HTMLDivElement | null>
  isMenuOpened: boolean
}) {
  return createPortal(
    <div inert={!props.isMenuOpened}>
      <MobileMenuBkg isOpened={props.isMenuOpened}>
        <SpeechBubbleContainer isOpened={props.isMenuOpened} ref={props.ref}>
          <div className="tw-grid tw-grid-cols-2 tw-gap-x-2 tw-gap-y-2.5">
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
    </div>,
    document.body,
  )
}
