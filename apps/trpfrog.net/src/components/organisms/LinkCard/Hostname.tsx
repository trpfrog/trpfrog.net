import * as React from 'react'

import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createURL } from '@trpfrog.net/utils'

import { tv } from '@/lib/tailwind'

export const createHostnameStyles = tv({
  slots: {
    wrapper: 'tw:flex tw:h-4 tw:w-fit tw:items-center tw:gap-0.5',
    hostname: 'tw:line-clamp-1 tw:h-full tw:opacity-60',
    favicon: 'tw:aspect-square tw:h-full tw:rounded-xs',
  },
  variants: {
    defaultFavicon: {
      true: {
        favicon: 'tw:opacity-60',
      },
    },
  },
})

export function Hostname(props: { href: string; favicon?: string }) {
  const url = new URL(props.href)
  const hostname = url.hostname
  const origin = url.origin

  const favicon = props.favicon?.startsWith('/') ? createURL(props.favicon, origin) : props.favicon

  const styles = createHostnameStyles({
    defaultFavicon: !favicon,
  })

  return (
    <div className={styles.wrapper()}>
      {favicon ? (
        <img
          className={styles.favicon()}
          alt=""
          src={favicon}
          loading="lazy"
          width={16}
          height={16}
        />
      ) : (
        <FontAwesomeIcon className={styles.favicon()} icon={faEarthAsia} />
      )}
      {hostname && <span className={styles.hostname()}>{hostname}</span>}
    </div>
  )
}
