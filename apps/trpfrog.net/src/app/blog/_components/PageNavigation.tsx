import { BlogPost } from '@trpfrog.net/posts'

import { RichButton } from '@/components/atoms/RichButton'

import { env } from '@/env/server'

type Props = {
  entry: BlogPost
  doNotShowOnFirst?: boolean
}

type PageTransferProps = {
  entry: BlogPost
  nextPage: number
  buttonText: string
  disabled?: boolean
}

export const PageTransferButton = (props: PageTransferProps) => {
  const { entry, nextPage, buttonText } = props

  let href = entry.previewContentId
    ? `/blog/preview/${entry.previewContentId}/${nextPage}`
    : `/blog/${entry.slug}/${nextPage}`

  if (env.NODE_ENV === 'production') {
    href += '#article'
  }

  return entry.isAll ? (
    <></>
  ) : props.disabled ? (
    <RichButton as="div" aria-disabled data-page-transfer-to={nextPage}>
      {buttonText}
    </RichButton>
  ) : (
    <RichButton as="a" href={href} data-page-transfer-to={nextPage}>
      {buttonText}
    </RichButton>
  )
}

export const PageNavigation = ({ entry, doNotShowOnFirst = false }: Props) => {
  const pagePosition1Indexed = entry.currentPage

  const isHidden =
    entry.numberOfPages === 1 ||
    (doNotShowOnFirst && entry.currentPage <= 1 && env.NODE_ENV === 'production')

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
      <PageTransferButton
        entry={entry}
        nextPage={pagePosition1Indexed - 1}
        buttonText={'← Prev'}
        disabled={entry.currentPage <= 1}
      />
      {Array.from(Array(entry.numberOfPages), (v, k) => (
        <PageTransferButton
          entry={entry}
          nextPage={k + 1}
          buttonText={k + 1 + ''}
          key={k}
          disabled={entry.currentPage === k + 1}
        />
      ))}
      <PageTransferButton
        entry={entry}
        nextPage={pagePosition1Indexed + 1}
        buttonText={'Next →'}
        disabled={entry.currentPage >= entry.numberOfPages}
      />
    </div>
  )
}
