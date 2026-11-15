'use client'

import { useEffect, useRef, useState } from 'react'

import { createTooltipController } from '@ui-sdk/react/tooltip'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'

interface ButtonWithTooltipProps extends React.ComponentPropsWithoutRef<'button'> {
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent?: React.ReactNode
}

// 押した結果を見せておく時間。押すたびに数え直す
const PRESSED_TOOLTIP_DURATION = 2000

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent, onClick, ...rest } = props
  const [tooltip] = useState(() => createTooltipController())
  const [isClicked, setIsClicked] = useState(false)
  // 押したことで開いたなら、時間が来たら閉じる
  const openedByPress = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hasClickedContent = clickedTooltipContent != null

  useEffect(() => () => clearTimeout(timer.current), [])

  const showPressed = () => {
    // タッチ操作ではホバーで開かないので、押したら開く
    if (!tooltip.isOpen()) openedByPress.current = tooltip.setOpen(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      // ホバーやフォーカスで開いているなら、閉じずに表示だけ戻す
      // (閉じるときは閉じ終わってから戻す)
      if (openedByPress.current) tooltip.close()
      else setIsClicked(false)
    }, PRESSED_TOOLTIP_DURATION)
  }

  return (
    <Tooltip
      type="label"
      controller={tooltip}
      closeOnPress={!hasClickedContent}
      onOpenChange={open => {
        if (open) return
        openedByPress.current = false
        clearTimeout(timer.current)
      }}
      onOpenChangeComplete={open => {
        if (!open) setIsClicked(false)
      }}
    >
      <TooltipTrigger
        {...rest}
        onClick={e => {
          setIsClicked(true)
          if (hasClickedContent) showPressed()
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
