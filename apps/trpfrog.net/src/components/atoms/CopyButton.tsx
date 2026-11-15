'use client'

import { useState } from 'react'

import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createTooltipController } from '@ui-sdk/react/tooltip'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'
import { tv } from '@/lib/tailwind'

type CopyButtonProps = {
  copyContent: string
  className?: string
  onError?: (error: Error) => void
}

const style = tv({
  base: 'tw:grid tw:place-items-center',
})

// Copied! を見せておく時間。押すたびに数え直す
const COPIED_DURATION = 2000

export function CopyButton(props: CopyButtonProps) {
  // 押したことで開いたときは、payload にその押下の時刻を持たせる
  const [tooltip] = useState(() => createTooltipController<number>())
  const [copiedAt, setCopiedAt] = useState<number | null>(null)

  const copy = () => {
    navigator.clipboard.writeText(props.copyContent).catch(props.onError || console.error)

    const at = performance.now()
    setCopiedAt(at)
    // ホバーやフォーカスで開いているなら表示を変えるだけにする。controller で開き直すと、
    // ポインタが離れても閉じなくなる。タッチ操作ではホバーで開かないので、ここで開く
    const openedByHover = tooltip.isOpen() && tooltip.getPayload() === undefined
    if (!openedByHover) void tooltip.open({ payload: at })

    setTimeout(() => {
      // 押したことで開いたなら閉じ、そうでなければ開いたまま表示だけ戻す。
      // あとから押されていれば、そちらのタイマーに任せる
      if (tooltip.getPayload() === at) tooltip.close()
      else setCopiedAt(current => (current === at ? null : current))
    }, COPIED_DURATION)
  }

  return (
    <Tooltip
      type="label"
      controller={tooltip}
      closeOnPress={false}
      onOpenChangeComplete={open => {
        if (!open) setCopiedAt(null)
      }}
    >
      <TooltipTrigger className={style({ className: props.className })} onClick={copy}>
        <FontAwesomeIcon icon={faClone} />
      </TooltipTrigger>
      <TooltipContent>{copiedAt === null ? 'Copy' : 'Copied!'}</TooltipContent>
    </Tooltip>
  )
}
