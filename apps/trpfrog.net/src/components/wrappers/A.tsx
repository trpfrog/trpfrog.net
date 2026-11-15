import * as React from 'react'

import Link from 'next/link'

import { match, P } from 'ts-pattern'

import { isInternalLink } from '@/lib/isInternalLink'

export interface AProps extends React.ComponentPropsWithRef<'a'> {
  openInNewTab?: 'always' | 'external' | 'never' | boolean
}

export function A(props: AProps) {
  const { openInNewTab: _openInNewTab, href, ref, children, ...rest } = props
  // href のないリンク (現在のページなど) は遷移先がないので、素の <a> にする
  if (href === undefined) {
    return (
      <a ref={ref} {...rest}>
        {children}
      </a>
    )
  }
  const isInternal = isInternalLink(href)

  const openInNewTab = match(_openInNewTab)
    .with(undefined, () => !isInternal)
    .with('external', () => !isInternal)
    .with('always', () => true)
    .with('never', () => false)
    .with(P.boolean, value => value)
    .exhaustive()

  const openInNewTabProps = openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return isInternal ? (
    <Link href={href} ref={ref} {...rest} {...openInNewTabProps}>
      {children}
    </Link>
  ) : (
    <a href={href} ref={ref} {...openInNewTabProps} {...rest}>
      {children}
    </a>
  )
}
