'use client'

import { useId } from 'react'

import { useReward } from 'react-rewards'
import seedrandom from 'seedrandom'
import { match } from 'ts-pattern'
import useSound from 'use-sound'

import { useRandom } from '@/hooks/useRandom'

import { tv } from '@/lib/tailwind'

import { type BalloonColor, balloonColors, balloonSoundUrl, confettiColors } from './constants'

type BalloonProps = {
  className?: string
  width: string
  height: string
  isBurst: boolean
  color: BalloonColor | 'random'
  onBurst?: () => void
  enableSound?: boolean
}

export function useBalloonSound() {
  const soundURL = balloonSoundUrl
  const [playFunction] = useSound(soundURL, { interrupt: false })
  return { playSound: playFunction }
}

const balloonStyle = tv({
  base: [
    'tw:inline-flex tw:justify-center tw:items-center tw:relative',
    'tw:[--bg:none] tw:[--bg-hover:var(--bg)] tw:motion-reduce:[--bg-hover:var(--bg)]',
    'tw:bg-(image:--bg) tw:hover:bg-(image:--bg-hover)',
  ],
  variants: {
    isPending: {
      true: 'tw:opacity-0 tw:translate-y-2',
      false: 'tw:opacity-100',
    },
    isBurst: {
      true: 'tw:[--bg:url("/images/balloon/broken.png")] tw:[--bg-hover:var(--bg)]',
      false: 'tw:cursor-crosshair',
    },
    color: {
      blue: 'tw:[--bg:url("/images/balloon/blue/normal.png")] tw:[--bg-hover:url("/images/balloon/blue/tremble.gif")]',
      green:
        'tw:[--bg:url("/images/balloon/green/normal.png")] tw:[--bg-hover:url("/images/balloon/green/tremble.gif")]',
      orange:
        'tw:[--bg:url("/images/balloon/orange/normal.png")] tw:[--bg-hover:url("/images/balloon/orange/tremble.gif")]',
    },
  },
  compoundVariants: [
    {
      // burst 時以外は transition あり
      isBurst: false,
      className: 'tw:transition-all tw:duration-500',
    },
  ],
})

export const Balloon = (props: BalloonProps) => {
  const balloonId = useId()
  const { playSound } = useBalloonSound()
  const { isPending: isRandomPending, value: seed } = useRandom()

  const color =
    props.color === 'random'
      ? isRandomPending
        ? balloonColors[0]
        : balloonColors[Math.floor(seedrandom(seed.toString())() * balloonColors.length)]
      : props.color

  const { reward } = useReward(balloonId, 'confetti', {
    zIndex: 100,
    startVelocity: 8,
    elementCount: 35,
    decay: 0.95,
    elementSize: 6,
    spread: 50,
    position: 'absolute',
    colors: confettiColors[color],
  })

  const ariaLabel = match({ isBurst: props.isBurst, color })
    .with({ isBurst: true }, () => '割れた風船')
    .with({ color: 'blue' }, () => '青い風船')
    .with({ color: 'green' }, () => '緑の風船')
    .with({ color: 'orange' }, () => 'オレンジの風船')
    .exhaustive()

  return (
    <button
      style={{
        width: props.width,
        height: props.height,
        backgroundSize: `${props.width} ${props.height}`,
      }}
      disabled={props.isBurst}
      aria-label={ariaLabel}
      className={balloonStyle({
        isPending: isRandomPending,
        isBurst: props.isBurst,
        color: props.isBurst ? undefined : color,
        className: props.className,
      })}
      onClick={() => {
        if (!props.isBurst) {
          if (props.enableSound) {
            playSound()
          }
          reward()
          props.onBurst?.()
        }
      }}
    >
      <span className="tw:inline-block" id={balloonId} />
    </button>
  )
}
