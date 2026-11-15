'use client'

import { useState } from 'react'

import { faCheck, faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

// コピーしたことを見せておく時間
const COPIED_DURATION = 2000

export function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(props.copyContent).catch(props.onError || console.error)
    setCopied(true)
    setTimeout(() => setCopied(false), COPIED_DURATION)
  }

  // タッチ操作ではツールチップが開かないので、アイコンでもコピーしたことを見せる
  return (
    <Tooltip
      type="label"
      closeOnPress={false}
      onOpenChangeComplete={open => {
        if (!open) setCopied(false)
      }}
    >
      <TooltipTrigger className={style({ className: props.className })} onClick={copy}>
        <FontAwesomeIcon icon={copied ? faCheck : faClone} />
      </TooltipTrigger>
      <TooltipContent>{copied ? 'Copied!' : 'Copy'}</TooltipContent>
    </Tooltip>
  )
}
