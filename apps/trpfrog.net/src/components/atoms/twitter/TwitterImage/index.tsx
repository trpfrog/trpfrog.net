import styles from './index.module.scss'

export type TwitterImageData = {
  src: string
  alt?: string
}

export type TwitterImageProps = {
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
            <video className={styles.image} key={index} src={image.src} controls />
          ) : (
            <img className={styles.image} key={index} src={image.src} alt={image.alt ?? ''} />
          ),
        )}
    </blockquote>
  )
}
