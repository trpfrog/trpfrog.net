'use client'

import React from 'react'

import { CldImageWrapper } from '@/components/utils/CldImageWrapper'

import styles from '@blog/_components/BlogImage/index.module.scss'
import { getPureCloudinaryPath } from '@blog/_lib/cloudinaryUtils'

export function ImageWithModal(props: {
  src: string
  alt?: string
  publicId?: string
}) {
  const searchParams = new URLSearchParams(props.src.split('?')[1])
  let width = parseInt(searchParams.get('w') ?? '', 10) || 1600
  let height = parseInt(searchParams.get('h') ?? '', 10) || 1200

  if (width < 1600) {
    width = 1600
    height = 1600 * (height / width)
  }

  const srcPath = getPureCloudinaryPath(props.src)
  const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`

  return (
    <CldImageWrapper
      src={props.publicId ?? srcPath.slice(1)}
      alt={props.alt || props.src}
      className={`rich_image ${styles.image}`}
      width={width}
      height={height}
      quality={50}
      placeholder="blur"
      blurDataURL={blurPath}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  )
}
