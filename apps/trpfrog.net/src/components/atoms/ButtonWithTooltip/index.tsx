'use client'

import { useState } from 'react'

import { createTooltipController } from '@ui-sdk/react/tooltip'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'

interface ButtonWithTooltipProps extends React.ComponentPropsWithoutRef<'button'> {
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent?: React.ReactNode
}

// 押した結果を見せておく時間。押すたびに数え直す
const PRESSED_TOOLTIP_DURATION = 2000

// 押したことをツールチップの payload として持たせる。押すたびに別のオブジェクトにして、
// どの押下のタイマーかを見分ける。ホバーやフォーカスで開き直すと payload は消える
interface Pressed {
  // 押したことで開いたか。そうなら時間が来たら閉じる
  openedByPress: boolean
}

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent, onClick, ...rest } = props
  const [tooltip] = useState(() => createTooltipController<Pressed | null>())
  const hasClickedContent = clickedTooltipContent != null

  const showPressed = () => {
    // タッチ操作ではホバーで開かないので、押したら開く
    const pressed: Pressed = {
      openedByPress: !tooltip.isOpen() || (tooltip.getPayload()?.openedByPress ?? false),
    }
    void tooltip.open({ payload: pressed })
    setTimeout(() => {
      // 押し直したか、閉じたあとなら何もしない
      if (!tooltip.isOpen() || tooltip.getPayload() !== pressed) return
      // ホバーやフォーカスで開いているなら、閉じずに表示だけ戻す
      if (pressed.openedByPress) tooltip.close()
      else void tooltip.open({ payload: null })
    }, PRESSED_TOOLTIP_DURATION)
  }

  return (
    <Tooltip type="label" controller={tooltip} closeOnPress={!hasClickedContent}>
      <TooltipTrigger
        {...rest}
        onClick={e => {
          if (hasClickedContent) showPressed()
          onClick?.(e)
        }}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {({ payload }) => (payload ? clickedTooltipContent : hoveredTooltipContent)}
      </TooltipContent>
    </Tooltip>
  )
}
