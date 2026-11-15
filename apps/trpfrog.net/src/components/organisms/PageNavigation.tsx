'use client'

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from '@ui-sdk/react/pagination'

import { richButtonStyle } from '@/components/atoms/RichButton'
import { A } from '@/components/wrappers'
import { twMerge } from '@/lib/tailwind'

// 現在のページから 2 の冪で離れたページと、前後 2 ページ、最初と最後のページを並べる
// e.g. 1, 5, 13, 17, 18, 19, [20], 21, 22, 23, 27, 35, 51, 83, 100
function createPageNumbers(currentPage: number, lastPage: number): number[] {
  if (lastPage < 10) {
    return [...Array(lastPage).keys()].map(e => e + 1)
  }
  const pages = [1, lastPage]
  for (let i = currentPage, dx = 1; i <= lastPage; i += dx, dx *= 2) pages.push(i)
  for (let i = currentPage, dx = 1; 1 <= i; i -= dx, dx *= 2) pages.push(i)
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (1 <= i && i <= lastPage) pages.push(i)
  }
  return [...new Set(pages)].sort((a, b) => a - b)
}

const buttonStyle = richButtonStyle({
  className: 'tw:data-current:bg-gray-400 tw:data-current:pointer-events-none',
})

export function PageNavigation(props: {
  currentPage: number
  lastPage: number
  createPath: (pageNo: number) => string
  showNextPrevButtons?: boolean
  className?: string
}) {
  const { currentPage, lastPage, createPath, showNextPrevButtons = false } = props
  const pages = createPageNumbers(currentPage, lastPage)

  return (
    <Pagination aria-label="ページ" page={currentPage} pageCount={lastPage} getHref={createPath}>
      <PaginationList
        className={twMerge('tw:flex tw:flex-wrap tw:justify-center tw:gap-1', props.className)}
      >
        {showNextPrevButtons && (
          <PaginationItem>
            <PaginationPrevious className={buttonStyle} render={<A />} aria-label="前のページ">
              ←
            </PaginationPrevious>
          </PaginationItem>
        )}
        {pages.map(page => (
          <PaginationItem key={page}>
            <PaginationLink page={page} className={buttonStyle} render={<A />} />
          </PaginationItem>
        ))}
        {showNextPrevButtons && (
          <PaginationItem>
            <PaginationNext className={buttonStyle} render={<A />} aria-label="次のページ">
              →
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationList>
    </Pagination>
  )
}
