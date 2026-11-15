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

// 押すたびに作る目印。どの押下のタイマーかを見分ける
type Press = object

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent, onClick, ...rest } = props
  // 押したことで開いたときだけ、その押下を payload として持たせる
  const [tooltip] = useState(() => createTooltipController<Press>())
  // 押した結果を表示している押下
  const [shownPress, setShownPress] = useState<Press | null>(null)
  const hasClickedContent = clickedTooltipContent != null

  const showPressed = () => {
    const press: Press = {}
    setShownPress(press)
    // ホバーやフォーカスで開いているときは表示だけを変える。controller で開き直すと
    // ポインタが離れても閉じなくなるため。タッチ操作ではホバーで開かないので、
    // 閉じているとき (や、前に押したことで開いたままのとき) は controller で開く
    if (!tooltip.isOpen() || tooltip.getPayload() !== undefined) {
      void tooltip.open({ payload: press })
    }
    setTimeout(() => {
      if (tooltip.getPayload() === press) {
        // 押したことで開いたなら閉じる。表示は閉じ終わってから戻す
        tooltip.close()
      } else {
        // 押し直していなければ、開いたまま表示だけ戻す
        setShownPress(current => (current === press ? null : current))
      }
    }, PRESSED_TOOLTIP_DURATION)
  }

  return (
    <Tooltip
      type="label"
      controller={tooltip}
      closeOnPress={!hasClickedContent}
      onOpenChangeComplete={open => {
        if (!open) setShownPress(null)
      }}
    >
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
        {shownPress !== null && hasClickedContent ? clickedTooltipContent : hoveredTooltipContent}
      </TooltipContent>
    </Tooltip>
  )
}
