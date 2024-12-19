'use client'

import { notFound } from 'next/navigation'

import { LoadingBlock } from '@/components/molecules/LoadingBlock'
import { PageNavigation } from '@/components/organisms/PageNavigation'

import { useImageRecords, usePageNumber } from './hooks'
import { IconRecord } from './IconRecord'

const NUM_ICONS_PER_PAGE = 20

export function Icons() {
  const oneIndexedPages = usePageNumber()
  const res = useImageRecords({
    limit: NUM_ICONS_PER_PAGE,
    offset: (oneIndexedPages - 1) * NUM_ICONS_PER_PAGE,
  })

  if (res.isLoading && !res.data) return <LoadingBlock isFullHeight />
  if (res.error || !res.data) return <div>Error: {res.error.message}</div>

  const images = res.data

  const lastPage = Math.ceil(images.total / NUM_ICONS_PER_PAGE)
  if (oneIndexedPages > lastPage) {
    notFound()
  }

  const navigation = (
    <PageNavigation
      createPath={pageNo => `/ai-icons?page=${pageNo}`}
      currentPage={oneIndexedPages}
      lastPage={lastPage}
    />
  )

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-flex-col tw-gap-1">{navigation}</div>
      <div className="tw-grid tw-grid-cols-1 tw-gap-3">
        {images.result.map(image => (
          <IconRecord
            key={image.id}
            src={image.imageUri}
            prompt={image.prompt.text}
            translated={image.prompt.translated}
            promptAuthor={image.prompt.author}
            imageModelName={image.modelName}
            createdAt={image.createdAt}
          />
        ))}
      </div>
      <div className="tw-mb-2">{navigation}</div>
    </div>
  )
}
