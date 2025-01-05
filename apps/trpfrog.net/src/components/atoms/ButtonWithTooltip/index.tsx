'use client'

import { useCallback, useId, useState } from 'react'

import dynamic from 'next/dynamic'

const Tooltip = dynamic(() => import('react-tooltip').then(m => m.Tooltip))

interface WithTooltipProps {
  wrapperAs?: 'div' | 'span'
  hoveredTooltipContent: React.ReactNode
  clickedTooltipContent?: React.ReactNode
  children: React.ReactNode
}

export function WithTooltip(props: WithTooltipProps) {
  const { children, hoveredTooltipContent, clickedTooltipContent } = props

  const [isClicked, setIsClicked] = useState(false)
  const [tooltipTimeoutId, setTooltipTimeoutId] = useState<number>(0)
  const tooltipId = useId()

  const clickHandler = useCallback(() => {
    if (tooltipTimeoutId) {
      clearTimeout(tooltipTimeoutId)
    }
    setIsClicked(true)
    const timeoutId = window.setTimeout(() => {
      setIsClicked(false)
    }, 2000)
    setTooltipTimeoutId(timeoutId)
  }, [tooltipTimeoutId])

  const mouseLeaveHandler = useCallback(() => {
    if (tooltipTimeoutId) {
      clearTimeout(tooltipTimeoutId)
    }
    setIsClicked(false)
  }, [tooltipTimeoutId])

  const Wrapper = props.wrapperAs ?? 'span'
  return (
    <>
      <Wrapper data-tooltip-id={tooltipId} onClick={clickHandler} onMouseLeave={mouseLeaveHandler}>
        {children}
      </Wrapper>
      <Tooltip id={tooltipId} place={'top'} style={{ padding: '0.5em', lineHeight: 1 }}>
        {isClicked && !!clickedTooltipContent ? clickedTooltipContent : hoveredTooltipContent}
      </Tooltip>
    </>
  )
}

export function ButtonWithTooltip(
  props: React.ComponentPropsWithoutRef<'button'> & WithTooltipProps,
) {
  const { children, hoveredTooltipContent, clickedTooltipContent, ...rest } = props

  return (
    <WithTooltip
      hoveredTooltipContent={hoveredTooltipContent}
      clickedTooltipContent={clickedTooltipContent}
    >
      <button {...rest}>{children}</button>
    </WithTooltip>
  )
}
