import * as React from 'react'

import { Tag } from '@blog/_components/Tag'

import styles from './index.module.css'

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  tags: string[]
  wrappedWithLink?: boolean
}

export function TagBar(props: Props) {
  const { tags, className, wrappedWithLink = true, ...rest } = props
  return (
    <div className={`${styles.tags} ${className}`} {...rest}>
      {tags.map(tag => (
        <Tag tag={tag} key={tag} wrappedWithLink={wrappedWithLink} />
      ))}
    </div>
  )
}
