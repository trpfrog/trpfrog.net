'use client'

import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'

interface ButtonWithTooltipProps extends React.ComponentPropsWithoutRef<'button'> {
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent?: React.ReactNode
}

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent, onClick, ...rest } = props
  const [isClicked, setIsClicked] = useState(false)
  const hasClickedContent = clickedTooltipContent != null

  return (
    <Tooltip
      closeOnPress={!hasClickedContent}
      onOpenChangeComplete={open => {
        if (!open) setIsClicked(false)
      }}
    >
      <TooltipTrigger
        {...rest}
        onClick={e => {
          setIsClicked(true)
          onClick?.(e)
        }}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {isClicked && hasClickedContent ? clickedTooltipContent : hoveredTooltipContent}
      </TooltipContent>
    </Tooltip>
  )
}
