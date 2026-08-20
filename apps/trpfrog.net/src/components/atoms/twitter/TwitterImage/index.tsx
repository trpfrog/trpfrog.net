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
      {props.images.filter(Boolean).map((image, index) =>
        isVideoFormat(image.src) ? (
          // Captions are not available for these externally hosted videos.
          // The accessible label still identifies the media to screen readers.
          // oxlint-disable-next-line jsx-a11y/media-has-caption
          <video
            className={styles.image}
            key={index}
            src={image.src}
            controls
            aria-label={image.alt || '動画'}
          />
        ) : (
          <img className={styles.image} key={index} src={image.src} alt={image.alt ?? ''} />
        ),
      )}
    </blockquote>
  )
}
