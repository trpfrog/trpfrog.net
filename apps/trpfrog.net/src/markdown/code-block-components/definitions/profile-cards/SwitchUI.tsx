'use client'
import { useState } from 'react'
import * as React from 'react'

import { Toggle } from '@ui-sdk/react/toggle'

type Props = {
  primaryButtonText: string
  primaryChildren: React.ReactNode
  secondaryChildren: React.ReactNode
  secondaryButtonText: string
}

export function SwitchUI(props: Props) {
  const [showSecondary, setShowSecondary] = useState(false)
  return (
    <>
      <p>
        <Toggle pressed={showSecondary} onPressedChange={setShowSecondary}>
          {showSecondary ? props.secondaryButtonText : props.primaryButtonText}
        </Toggle>
      </p>
      {showSecondary ? props.secondaryChildren : props.primaryChildren}
    </>
  )
}
