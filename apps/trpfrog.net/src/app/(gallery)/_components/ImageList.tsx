import Image from 'next/legacy/image'
import Link from 'next/link'

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
    <div className="tw-my-7 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(100px,1fr))] tw-gap-4">
      {props.images.map(({ src, url, alt }, idx) => (
        <Link href={url} key={src}>
          <Image
            src={src}
            width={props.imageWidth ?? 100}
            height={props.imageHeight ?? 100}
            objectFit={'contain'}
            quality={props.quality ?? 50}
            alt={alt ?? idx + '番目のスタンプ画像'}
          />
        </Link>
      ))}
    </div>
  )
}
