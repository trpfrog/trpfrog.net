import { VideoPlayer } from '@/components/molecules/VideoPlayer'

import styles from './index.module.css'

export type TwitterImageData = {
  src: string
  alt?: string
}

type TwitterImageProps = {
  images: TwitterImageData[]
  cite?: string
}

export function TwitterImage(props: TwitterImageProps) {
  const isVideoFormat = (fileName: string) =>
    ['.mp4', '.webm', '.mov'].some(ext => fileName?.trim().endsWith(ext))
  return (
    <blockquote className={styles.blockquote} cite={props.cite}>
      {props.images
        .filter(Boolean)
        .map((image, index) =>
          isVideoFormat(image.src) ? (
            <VideoPlayer
              className={styles.image}
              key={index}
              src={image.src}
              label={image.alt || '動画'}
            />
          ) : (
            <img className={styles.image} key={index} src={image.src} alt={image.alt ?? ''} />
          ),
        )}
    </blockquote>
  )
}
