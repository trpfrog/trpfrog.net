'use client'

import * as React from 'react'
import { useState } from 'react'

import { Toggle } from '@ui-sdk/react/toggle'
import type { Except } from 'type-fest'

import { CldImageWrapper } from '@/components/utils/CldImageWrapper'
import { getPureCloudinaryPath } from '@/lib/cloudinaryUtils'
import { tv } from '@/lib/tailwind'

interface ImageProps extends Except<
  React.ComponentPropsWithRef<'img'>,
  'width' | 'height' | 'src'
> {
  src: string
  width: number
  height: number
  withSpoiler?: boolean
}

// 見た目は data-revealed (ぼかし) と、Toggle が付ける data-pressed (ボタン) で切り替える
const spoilerStyles = tv({
  slots: {
    blur: [
      'tw:absolute tw:left-0 tw:top-0 tw:h-full tw:w-full',
      'tw:rounded-md tw:duration-500',
      'tw:not-data-revealed:backdrop-blur-2xl tw:not-data-revealed:has-[:hover]:backdrop-blur-md',
      'tw:data-revealed:pointer-events-none tw:data-revealed:block tw:data-revealed:backdrop-blur-none',
    ],
    button: [
      'tw:absolute tw:px-4 tw:py-2 tw:text-black',
      'tw:cursor-pointer tw:font-bold tw:backdrop-blur-sm',
      'tw:bg-white/50 tw:duration-200 tw:hover:bg-white/70',
      'tw:not-data-pressed:left-1/2 tw:not-data-pressed:top-1/2',
      'tw:not-data-pressed:-translate-x-1/2 tw:not-data-pressed:-translate-y-1/2',
      'tw:not-data-pressed:rounded-full',
      'tw:data-pressed:pointer-events-auto tw:data-pressed:left-0 tw:data-pressed:top-0',
      'tw:data-pressed:rounded-ee-md tw:data-pressed:rounded-ss-md',
      'tw:data-pressed:px-3 tw:data-pressed:py-1 tw:data-pressed:text-sm',
    ],
  },
})()

function ImageSpoiler() {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className={spoilerStyles.blur()} data-revealed={revealed || undefined}>
      <Toggle pressed={revealed} onPressedChange={setRevealed} className={spoilerStyles.button()}>
        {revealed ? '画像を隠す' : '画像を表示する'}
      </Toggle>
    </div>
  )
}

const imageStyles = tv({
  slots: {
    wrapper: 'tw:relative',
    image: [
      'tw:break-inside-avoid',
      'tw:max-w-full tw:rounded-md tw:shadow-sm',
      'tw:bg-trpfrog-100 tw:dark:bg-trpfrog-700',
    ],
  },
})()

export function Image(props: ImageProps) {
  const {
    className,
    src,
    alt,
    width: originalWidth,
    height: originalHeight,
    withSpoiler,
    ...rest
  } = props

  let width = originalWidth
  let height = originalHeight

  const minWidth = 1000
  if (width < minWidth) {
    height = Math.round(minWidth * (height / width))
    width = minWidth
  }

  const maxHeight = 700
  if (height > maxHeight) {
    width = Math.round(maxHeight * (width / height))
    height = maxHeight
  }

  let srcPath = getPureCloudinaryPath(src).split('?')[0]
  if (!srcPath.startsWith('/')) srcPath = '/' + srcPath
  const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`

  const aspectRatio = `${width}/${height}`

  return (
    <div className={imageStyles.wrapper()} {...rest}>
      <CldImageWrapper
        src={srcPath.slice(1)}
        alt={alt ?? ''}
        className={imageStyles.image({ className })}
        width={width}
        height={height}
        quality={50}
        placeholder="blur"
        blurDataURL={blurPath}
        style={{ aspectRatio }}
      />
      {withSpoiler && <ImageSpoiler />}
    </div>
  )
}
