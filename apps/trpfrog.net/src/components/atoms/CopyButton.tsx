'use client'

import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ButtonWithTooltip } from '@/components/atoms/ButtonWithTooltip'
import { tv } from '@/lib/tailwind'

type CopyButtonProps = {
  copyContent: string
  className?: string
  onError?: (error: Error) => void
}

const style = tv({
  base: 'tw:grid tw:place-items-center',
})

export function CopyButton(props: CopyButtonProps) {
  return (
    <ButtonWithTooltip
      className={style({ className: props.className })}
      onClick={() => {
        navigator.clipboard.writeText(props.copyContent).catch(props.onError || console.error)
      }}
      hoveredTooltipContent={'Copy'}
      clickedTooltipContent={'Copied!'}
    >
      <FontAwesomeIcon icon={faClone} />
    </ButtonWithTooltip>
  )
}
