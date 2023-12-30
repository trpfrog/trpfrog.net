import * as React from 'react'

import { useHeaderStatus } from './hooks/useHeaderStatus'

export const StickToTop = (props: {
  children: React.ReactNode
  top: string | number
}) => {
  const headerVisible = useHeaderStatus().visible
  const getStyle = (isHeaderVisible: boolean) =>
    isHeaderVisible
      ? `calc(var(--header-height) + ${props.top})`
      : `${props.top}`

  return (
    <div
      style={{
        transition: '0.1s',
        position: 'sticky',
        top: getStyle(headerVisible),
      }}
    >
      {props.children}
    </div>
  )
}
