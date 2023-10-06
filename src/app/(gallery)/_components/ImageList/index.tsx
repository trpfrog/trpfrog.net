import Image from 'next/legacy/image'
import Link from 'next/link'

import styles from './index.module.scss'

export type ImageListProps = {
  images: ImagePaths[]
  imageWidth?: number
  imageHeight?: number
  quality?: number
}

export type ImagePaths = {
  src: string
  url: string
  alt?: string
}

export function ImageList(props: ImageListProps) {
  return (
    <div className={styles.icon_grid}>
      {props.images.map(({ src, url, alt }, idx) => (
        <Link href={url} key={src}>
          <Image
            src={src}
            width={props.imageWidth ?? 100}
            height={props.imageHeight ?? 100}
            objectFit={'contain'}
            quality={props.quality ?? 15}
            alt={alt ?? idx + '番目のスタンプ画像'}
          />
        </Link>
      ))}
    </div>
  )
}
