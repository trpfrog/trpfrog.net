import styles from "./index.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

type ImageNavigationProps = {
  icons: {
    key: React.Key,
    src: string,
    alt: string
  }[],
  nextHref: string,
  prevHref: string
}

export default function ImageNavigation(props: ImageNavigationProps) {
  return (
    <div className={styles.thumbnails}>
      <Link href={props.prevHref} className={styles.prev_image}>
        &larr;
      </Link>
      {props.icons.map(nav => {
        return (
          <Image
            key={nav.key}
            src={nav.src}
            width={100}
            height={100}
            objectFit={'contain'}
            quality={50}
            alt={nav.alt}
          />
        )
      })}
      <Link href={props.nextHref} className={styles.next_image}>
        &rarr;
      </Link>
    </div>
  )
}
