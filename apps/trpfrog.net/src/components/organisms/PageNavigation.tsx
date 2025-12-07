'use client'

import { useMemo } from 'react'

import Link from 'next/link'

import { RichButton } from '@/components/atoms/RichButton'

function createButtonLables(currentPage: number, lastPage: number): number[] {
  let buttons: number[] = []

  if (lastPage < 10) {
    buttons = [...Array(lastPage).keys()].map(e => e + 1)
  } else {
    let dx = 1
    for (let i = currentPage; i <= lastPage; i += dx, dx *= 2) {
      buttons.push(i)
    }
    dx = 1
    for (let i = currentPage; 1 <= i; i -= dx, dx *= 2) {
      buttons.push(i)
    }
    buttons.push(1)
    buttons.push(lastPage)

    buttons.push(
      ...[currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2].filter(
        e => 1 <= e && e <= lastPage,
      ),
    )

    buttons = [...new Set(buttons)].sort((a, b) => a - b)
  }

  return buttons
}

function Button(props: {
  pageNo: number
  text?: string
  createPath: (pageNo: number) => string
  current: boolean
  disabled?: boolean
}) {
  const { pageNo, createPath } = props
  const href = useMemo(() => createPath(pageNo), [pageNo, createPath])
  return props.current || props.disabled ? (
    <RichButton as="button" disabled={props.disabled} data-current={props.current}>
      {props.text ?? props.pageNo}
    </RichButton>
  ) : (
    <RichButton as={Link} href={href} data-current={props.current}>
      {props.text ?? props.pageNo}
    </RichButton>
  )
}

export function PageNavigation(props: {
  currentPage: number
  lastPage: number
  createPath: (pageNo: number) => string
  showNextPrevButtons?: boolean
}) {
  const { currentPage, lastPage, showNextPrevButtons = false } = props
  // create array like [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, ..., lastPage]
  const buttonLabels = useMemo(
    () => createButtonLables(currentPage, lastPage),
    [currentPage, lastPage],
  )

  return (
    <div className="tw:flex tw:gap-1 tw:flex-wrap tw:justify-center">
      {showNextPrevButtons && (
        <Button
          pageNo={currentPage - 1}
          createPath={props.createPath}
          current={false}
          disabled={currentPage === 1}
          text="←"
        />
      )}
      {buttonLabels.map(pageNo => (
        <Button
          key={pageNo}
          pageNo={pageNo}
          current={pageNo === props.currentPage}
          createPath={props.createPath}
          disabled={pageNo === props.currentPage}
        />
      ))}
      {showNextPrevButtons && (
        <Button
          pageNo={currentPage + 1}
          createPath={props.createPath}
          current={false}
          disabled={currentPage === lastPage}
          text="→"
        />
      )}
    </div>
  )
}
