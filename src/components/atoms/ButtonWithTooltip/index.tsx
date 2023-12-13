import * as React from 'react'
import { useCallback, useId, useState } from 'react'

import { Tooltip } from 'react-tooltip'

export interface ButtonWithTooltipProps
  extends React.ComponentPropsWithoutRef<'button'> {
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent: React.ReactNode
}

export function ButtonWithTooltip(props: ButtonWithTooltipProps) {
  const {
    children,
    onClick,
    hoveredTooltipContent,
    clickedTooltipContent,
    ...rest
  } = props

  const [isClicked, setIsClicked] = useState(false)
  const [tooltipTimeoutId, setTooltipTimeoutId] = useState<number>(0)
  const tooltipId = useId()

  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (tooltipTimeoutId) {
        clearTimeout(tooltipTimeoutId)
      }
      setIsClicked(true)
      const timeoutId = window.setTimeout(() => {
        setIsClicked(false)
      }, 2000)
      setTooltipTimeoutId(timeoutId)
    },
    [onClick, tooltipTimeoutId],
  )

  const mouseLeaveHandler = useCallback(() => {
    if (tooltipTimeoutId) {
      clearTimeout(tooltipTimeoutId)
    }
    setIsClicked(false)
  }, [tooltipTimeoutId])

  return (
    <>
      <button
        data-tooltip-id={tooltipId}
        onClick={clickHandler}
        onMouseLeave={mouseLeaveHandler}
        {...rest}
      >
        {children}
      </button>
      <Tooltip
        id={tooltipId}
        place={'top'}
        style={{ padding: '0.5em', lineHeight: 1 }}
      >
        {isClicked ? clickedTooltipContent : hoveredTooltipContent}
      </Tooltip>
    </>
  )
}
