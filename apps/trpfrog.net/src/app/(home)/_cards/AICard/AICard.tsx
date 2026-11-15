import * as React from 'react'

import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LinkTopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'
import { tv } from '@/lib/tailwind'

import { IconFrame } from './IconFrame'

const styles = tv({
  slots: {
    wrapper: 'tw:relative tw:h-full tw:w-full',
    card: 'tw:grid',
    button: cardButtonStyle({
      class: 'tw:absolute tw:bottom-2 tw:left-2 tw:z-10 tw:size-8 tw:rounded-full',
      invertColor: true,
    }),
    description: 'tw:text-center tw:text-xs tw:dark:bg-text-color tw:dark:text-window-color',
  },
})()

export function AICard() {
  return (
    <div className={styles.wrapper()}>
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
      </LinkTopCard>
      <Tooltip toggleable>
        <TooltipTrigger className={styles.button()} aria-label="この画像について">
          ?
        </TooltipTrigger>
        <TooltipContent className={styles.description()}>
          これは AI により自動生成された画像です。
          <br />
          毎日自動更新されます。
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
