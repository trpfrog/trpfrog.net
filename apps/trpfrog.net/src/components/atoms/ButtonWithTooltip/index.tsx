'use client'

import { useEffect, useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'

interface ButtonWithTooltipProps extends React.ComponentPropsWithoutRef<'button'> {
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent?: React.ReactNode
}

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent, onClick, ...rest } = props
  const [isClicked, setIsClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  // タッチ操作ではホバーで開かないので、押したら少しの間だけ開いて押した結果を見せる
  // 押すたびに数え直すため、押した時刻を持つ
  const [pressedAt, setPressedAt] = useState<number | null>(null)
  const hasClickedContent = clickedTooltipContent != null

  useEffect(() => {
    if (pressedAt === null) return
    const timer = setTimeout(() => setPressedAt(null), 2000)
    return () => clearTimeout(timer)
  }, [pressedAt])

  return (
    <Tooltip
      type="label"
      open={hovered || pressedAt !== null}
      onOpenChange={open => {
        setHovered(open)
        if (!open) setPressedAt(null)
      }}
      closeOnPress={!hasClickedContent}
      onOpenChangeComplete={open => {
        if (!open) setIsClicked(false)
      }}
    >
      <TooltipTrigger
        {...rest}
        onClick={e => {
          setIsClicked(true)
          if (hasClickedContent) setPressedAt(Date.now())
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
