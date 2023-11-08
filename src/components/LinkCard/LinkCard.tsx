import React from 'react'

import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { BlockLink } from '@/components/molecules/BlockLink'

import { createURL } from '@/lib/url'
import { ParseWithBudouX } from '@/lib/wordSplit'

import styles from './LinkCard.module.scss'

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  title: string
  description?: string
  imageUrl?: string
  favicon?: string
  href: string
  skeleton?: false
}

export function LinkCard(props: LinkCardProps) {
  let { className, favicon, title, description, imageUrl, href, ...rest } =
    props

  const hostname = new URL(href).hostname
  const origin = new URL(href).origin

  if (title.length > 80) {
    title = title.slice(0, 80) + '...'
  }

  if (description && description?.length > 80) {
    description = description.slice(0, 80) + '...'
  }

  if (imageUrl && imageUrl.startsWith('/')) {
    imageUrl = createURL(imageUrl, origin)
  }

  if (favicon && favicon.startsWith('/')) {
    favicon = createURL(favicon, origin)
  }

  return (
    <div className={classNames(className)} {...rest}>
      <BlockLink href={href} className={styles.main}>
        <div className={styles.textArea}>
          <div className={styles.domain}>
            {favicon ? (
              <img className={styles.favicon} alt="" src={favicon} />
            ) : (
              <FontAwesomeIcon
                className={styles.favicon}
                icon={faEarthAsia}
                data-default-favicon
              />
            )}
            {hostname && <span className={styles.domainText}>{hostname}</span>}
          </div>
          <div className={styles.titleDescription}>
            <div className={styles.title}>
              <ParseWithBudouX str={title} slug={''} />
            </div>
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>
        </div>
        {imageUrl && <img className={styles.image} alt="" src={imageUrl} />}
      </BlockLink>
    </div>
  )
}
