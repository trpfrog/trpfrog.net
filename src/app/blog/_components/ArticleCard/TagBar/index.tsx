import styles from './index.module.scss'
import Tag from '@/app/blog/_components/Tag'
import React from 'react'

type Props = Omit<React.ComponentProps<'div'>, 'children'> & {
  tags: string[]
}

export default function TagBar(props: Props) {
  const { tags, className, ...rest } = props
  return (
    <div className={`${styles.tags} ${className}`} {...rest}>
      {tags.map(tag => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
  )
}
