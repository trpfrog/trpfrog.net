import * as React from 'react'
import { useMemo } from 'react'

import Link from 'next/link'
import { match, P } from 'ts-pattern'

import { isInternalLink } from '@/lib/isInternalLink'

export interface AProps extends React.ComponentPropsWithRef<'a'> {
  openInNewTab?: 'always' | 'external' | 'never' | boolean
}

export function A(props: AProps) {
  const { openInNewTab: _openInNewTab, href = '', ref, ...rest } = props
  const isInternal = isInternalLink(href)

  const openInNewTab = match(_openInNewTab)
    .with(undefined, () => !isInternal)
    .with('external', () => !isInternal)
    .with('always', () => true)
    .with('never', () => false)
    .with(P.boolean, value => value)
    .exhaustive()

  const openInNewTabProps = useMemo(
    () =>
      openInNewTab
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {},
    [openInNewTab],
  )

  return isInternal ? (
    <Link href={href} ref={ref} {...rest} {...openInNewTabProps} />
  ) : (
    <a href={href} ref={ref} {...openInNewTabProps} {...rest} />
  )
}
