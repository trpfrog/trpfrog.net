import * as React from 'react'

import { useHeaderStatus } from './useHeaderStatus'

interface StickToTopProps {
  children: React.ReactNode
  top: string | number
}

export function StickToTop(props: StickToTopProps) {
  const headerVisible = useHeaderStatus().visible

  return (
    <div
      className="tw:sticky tw:duration-100"
      style={{
        top: headerVisible ? `calc(var(--header-height) + ${props.top})` : `${props.top}`,
      }}
    >
      {props.children}
    </div>
  )
}
