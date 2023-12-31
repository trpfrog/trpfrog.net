import * as React from 'react'
import { useMemo } from 'react'

import Link from 'next/link'

import { isInternalLink } from '@/lib/isInternalLink'

export interface AProps extends React.ComponentPropsWithRef<'a'> {
  openInNewTab?: 'always' | 'external' | 'never' | boolean
}

export const A = React.forwardRef<HTMLAnchorElement, AProps>(
  function A(props, ref) {
    const { openInNewTab: _openInNewTab, href = '', ...rest } = props
    const isInternal = isInternalLink(href)

    let openInNewTab: boolean
    if (_openInNewTab === 'external' || _openInNewTab == null) {
      openInNewTab = !isInternal
    } else if (_openInNewTab === 'always') {
      openInNewTab = true
    } else if (_openInNewTab === 'never') {
      openInNewTab = false
    } else {
      openInNewTab = _openInNewTab
    }

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
  },
)
