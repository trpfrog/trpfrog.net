import React from 'react'

import styles from './index.module.scss'

type ImageData = {
  src: string
  alt?: string
}

export type TwitterImageProps = {
  images: ImageData[]
}

export function TwitterImage(props: TwitterImageProps) {
  return (
    <blockquote className={styles.blockquote}>
      {props.images.filter(Boolean).map((image, index) => (
        <img
          className={styles.image}
          key={index}
          src={image.src}
          alt={image.alt ?? ''}
        />
      ))}
    </blockquote>
  )
}
