import React from 'react'

export type OpenInNewTabProps = Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'target' | 'rel'
>

export function OpenInNewTab(props: OpenInNewTabProps) {
  return <a {...props} target="_blank" rel="noreferrer noopener" />
}
