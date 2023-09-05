import React, { CSSProperties } from 'react'

import Button from '@/components/atoms/Button'

import BlogPost from '@blog/_lib/blogPost'

type Props = {
  entry: BlogPost
  doNotShowOnFirst?: boolean
}

type PageTransferProps = {
  entry: BlogPost
  nextPage: number
  buttonText: string
}

export const PageTransferButton = (props: PageTransferProps) => {
  const { entry, nextPage, buttonText } = props

  let href = entry.previewContentId
    ? `/blog/preview/${entry.previewContentId}/${nextPage}`
    : `/blog/${entry.slug}/${nextPage}`

  if (process.env.NODE_ENV === 'production') {
    href += '#article'
  }

  return entry.isAll ? (
    <></>
  ) : (
    <Button href={href} data-page-transfer-to={nextPage}>
      {buttonText}
    </Button>
  )
}

const PageNavigation = ({ entry, doNotShowOnFirst = false }: Props) => {
  const pagePosition1Indexed = entry.currentPage

  const disabledButtonStyle: CSSProperties = {
    background: 'darkgray',
    transform: 'translateY(2px)',
    boxShadow: 'none',
    cursor: 'default',
  }

  const isHidden =
    entry.numberOfPages === 1 ||
    (doNotShowOnFirst &&
      entry.currentPage <= 1 &&
      process.env.NODE_ENV === 'production')

  return isHidden ? (
    <></>
  ) : (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '6px',
        justifyContent: 'center',
      }}
    >
      {entry.currentPage > 1 && (
        <PageTransferButton
          entry={entry}
          nextPage={pagePosition1Indexed - 1}
          buttonText={'← Prev'}
        />
      )}
      {Array.from(Array(entry.numberOfPages), (v, k) =>
        entry.currentPage !== k + 1 ? (
          <PageTransferButton
            entry={entry}
            nextPage={k + 1}
            buttonText={k + 1 + ''}
            key={k}
          />
        ) : (
          <Button style={disabledButtonStyle} key={k}>
            {k + 1}
          </Button>
        ),
      )}
      {entry.currentPage < entry.numberOfPages && (
        <PageTransferButton
          entry={entry}
          nextPage={pagePosition1Indexed + 1}
          buttonText={'Next →'}
        />
      )}
    </div>
  )
}

export default PageNavigation
