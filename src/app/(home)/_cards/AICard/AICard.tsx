import * as React from 'react'

import { TopCard } from '@/app/(home)/_components/TopCard'
import { cardButtonStyle } from '@/app/(home)/_styles/cardButtonStyle'

import { InlineLink } from '@/components/atoms/InlineLink'

import { useTooltip } from '@/hooks/useTooltip'

import { tv } from '@/lib/tailwind/variants'

import { IconFrame } from './IconFrame'

const styles = tv({
  slots: {
    card: '',
    button: cardButtonStyle({
      class: 'tw-absolute tw-bottom-2 tw-right-2 tw-size-8 tw-rounded-full',
      invertColor: true,
    }),
    description:
      '!tw-text-center !tw-text-xs dark:!tw-bg-text-color dark:!tw-text-window-color',
    poweredBy: 'tw-text-center tw-text-xs tw-text-gray-500',
  },
})()

export function AICard() {
  const { TooltipContent, TooltipButton } = useTooltip()

  return (
    <TopCard title="AI Generated Icon" className={styles.card()}>
      <IconFrame />
      <div className={styles.poweredBy()}>
        Powered by{' '}
        <InlineLink href={'https://huggingface.co/Prgckwb/trpfrog-diffusion'}>
          Prgckwb/trpfrog-diffusion
        </InlineLink>
      </div>
      <TooltipButton className={styles.button()}>?</TooltipButton>
      <TooltipContent className={styles.description()}>
        これは AI により自動生成された画像です。
        <br />
        最後の生成から3時間経つと再生成されます。
      </TooltipContent>
    </TopCard>
  )
}
