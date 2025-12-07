'use client'

import * as React from 'react'
import { useState } from 'react'

import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import { getPureCloudinaryPath } from '@/lib/cloudinaryUtils'
import { tv } from '@/lib/tailwind/variants'

import type { Except } from 'type-fest'

interface ImageProps
  extends Except<React.ComponentPropsWithRef<'img'>, 'width' | 'height' | 'src'> {
  src: string
  width: number
  height: number
  withSpoiler?: boolean
}

const createSpoilerStyles = tv({
  slots: {
    blur: ['tw:absolute tw:left-0 tw:top-0 tw:h-full tw:w-full', 'tw:rounded-md tw:duration-500'],
    button: [
      'tw:absolute tw:px-4 tw:py-2 tw:text-black',
      'tw:cursor-pointer tw:font-bold tw:backdrop-blur',
      'tw:bg-white/50 tw:duration-200 tw:hover:bg-white/70',
    ],
  },
  variants: {
    blur: {
      true: {
        blur: 'tw:backdrop-blur-2xl tw:has-[:hover]:backdrop-blur-md',
        button: `tw:left-1/2 tw:top-1/2 tw:-translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full`,
      },
      false: {
        blur: 'tw:pointer-events-none tw:block tw:backdrop-blur-none',
        button: `tw:pointer-events-auto tw:left-0 tw:top-0 tw:rounded-ee-md tw:rounded-ss-md tw:px-3 tw:py-1 tw:text-sm`,
      },
    },
  },
})

function ImageSpoiler() {
  const [spoilerState, setSpoilerState] = useState(true)
  const styles = createSpoilerStyles({ blur: spoilerState })
  return (
    <div className={styles.blur()}>
      <button className={styles.button()} onClick={() => setSpoilerState(prv => !prv)}>
        {spoilerState ? '画像を表示する' : '画像を隠す'}
      </button>
    </div>
  )
}

const imageStyles = tv({
  slots: {
    wrapper: 'tw:relative',
    image: [
      'tw:break-inside-avoid',
      'tw:max-w-full tw:rounded-md tw:shadow',
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
