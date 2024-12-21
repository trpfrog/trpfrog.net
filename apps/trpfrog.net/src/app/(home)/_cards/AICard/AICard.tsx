import * as React from 'react'

import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { useTooltip } from '@/hooks/useTooltip'

import { tv } from '@/lib/tailwind/variants'

import { IconFrame } from './IconFrame'

const styles = tv({
  slots: {
    card: 'tw-grid',
    button: cardButtonStyle({
      class: 'tw-absolute tw-bottom-2 tw-left-2 tw-size-8 tw-rounded-full',
      invertColor: true,
    }),
    description: '!tw-text-center !tw-text-xs dark:!tw-bg-text-color dark:!tw-text-window-color',
    poweredBy: 'tw-text-center tw-text-xs tw-text-gray-500',
  },
})()

export function AICard() {
  const { TooltipContent, TooltipButton } = useTooltip()

  return (
    <LinkTopCard
      className={styles.card()}
      href="/ai-icons"
      readMoreText={
        <>
          <FontAwesomeIcon icon={faHistory} />→
        </>
      }
    >
      <IconFrame />
      <TooltipButton className={styles.button()}>?</TooltipButton>
      <TooltipContent className={styles.description()}>
        これは AI により自動生成された画像です。
        <br />
        最後の生成から3時間経つと再生成されます。
      </TooltipContent>
    </LinkTopCard>
  )
}
