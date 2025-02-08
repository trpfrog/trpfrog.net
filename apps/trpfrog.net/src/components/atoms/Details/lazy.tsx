'use client'
import { useState } from 'react'

import { Details, DetailsProps } from './index'

export function LazyDetails(props: DetailsProps) {
  const [open, setOpen] = useState(props.open ?? false)
  const { children, ...rest } = props
  return (
    <Details
      {...rest}
      onClick={e => {
        setOpen(!open)
        props.onClick?.(e)
      }}
    >
      {open && children}
    </Details>
  )
}
