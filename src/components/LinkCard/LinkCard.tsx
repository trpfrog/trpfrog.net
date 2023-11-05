import React from 'react'

import classNames from 'classnames'

import { BlockLink } from '@/components/molecules/BlockLink'

import { createURL } from '@/lib/url'
import { ParseWithBudouX } from '@/lib/wordSplit'

import styles from './LinkCard.module.scss'

export type LinkCardProps = React.ComponentPropsWithoutRef<'div'> & {
  title: string
  description?: string
  imageUrl?: string
  favicon?: string
  href: string
}

export function LinkCard(props: LinkCardProps) {
  let {
    className,
    favicon,
    children,
    title,
    description,
    imageUrl,
    href,
    ...rest
  } = props

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
    <BlockLink href={href}>
      <div className={classNames(styles.main, className)} {...rest}>
        <div className={styles.textArea}>
          <div className={styles.domain}>
            {favicon && <img className={styles.favicon} alt="" src={favicon} />}
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
        <img className={styles.image} alt="" src={imageUrl} />
      </div>
    </BlockLink>
  )
}
