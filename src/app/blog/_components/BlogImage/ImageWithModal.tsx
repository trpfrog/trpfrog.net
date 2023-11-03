'use client'

import React, { useState } from 'react'

import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import styles from '@blog/_components/BlogImage/index.module.scss'
import { getPureCloudinaryPath } from '@blog/_lib/cloudinaryUtils'

export function ImageWithModal(props: {
  src: string
  alt?: string
  publicId?: string
  width: number
  height: number
  spoiler?: boolean
}) {
  const srcPath = getPureCloudinaryPath(props.src)
  const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`

  const [spoilerState, setSpoilerState] = useState(props.spoiler ?? false)

  return (
    <div className={styles.client_img_wrapper}>
      <CldImageWrapper
        src={props.publicId ?? srcPath.slice(1)}
        alt={props.alt || props.src}
        className={`rich_image ${styles.image}`}
        width={props.width}
        height={props.height}
        quality={50}
        placeholder="blur"
        blurDataURL={blurPath}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      {spoilerState && (
        <div className={styles.spoiler}>
          <div
            className={styles.spoiler_text}
            onClick={() => setSpoilerState(false)}
          >
            画像を表示する
          </div>
        </div>
      )}
    </div>
  )
}
