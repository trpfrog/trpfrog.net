'use client'

import React, { useState } from 'react'

import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import styles from '@blog/_components/BlogImage/index.module.scss'
import { getPureCloudinaryPath } from '@blog/_lib/cloudinaryUtils'

function ImageSpoiler() {
  const [spoilerState, setSpoilerState] = useState(true)
  return spoilerState ? (
    <div className={styles.spoiler}>
      <div
        className={styles.spoiler_text}
        onClick={() => setSpoilerState(false)}
      >
        画像を表示する
      </div>
    </div>
  ) : (
    <></>
  )
}

export function ImageWithModal(props: {
  src: string
  alt?: string
  publicId?: string
  spoiler?: boolean
}) {
  const searchParams = new URLSearchParams(props.src.split('?')[1])
  let width = parseInt(searchParams.get('w') ?? '', 10) || 1000
  let height = parseInt(searchParams.get('h') ?? '', 10) || 750

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

  const srcPath = getPureCloudinaryPath(props.src).split('?')[0]
  const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`

  return (
    <div style={{ position: 'relative' }}>
      <CldImageWrapper
        src={props.publicId ?? srcPath.slice(1)}
        alt={props.alt || props.src}
        className={`rich_image ${styles.image}`}
        width={width}
        height={height}
        quality={50}
        placeholder="blur"
        blurDataURL={blurPath}
        style={{
          height: 'auto',
          aspectRatio: `${width}/${height}`,
        }}
      />
      {props.spoiler && <ImageSpoiler />}
    </div>
  )
}
