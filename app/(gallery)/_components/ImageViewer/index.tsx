import styles from './index.module.scss'
import Image from 'next/legacy/image'
import React from 'react'

type ImageViewerProps = {
  src: string
  alt: string
}

export default function ImageViewer(props: ImageViewerProps) {
  return (
    <div className={styles.img_wrapper_outside}>
      <div className={styles.img_wrapper_inside}>
        <Image
          src={props.src}
          width={100}
          height={100}
          layout={'responsive'}
          objectFit={'contain'}
          alt={props.alt}
        />
      </div>
    </div>
  )
}
