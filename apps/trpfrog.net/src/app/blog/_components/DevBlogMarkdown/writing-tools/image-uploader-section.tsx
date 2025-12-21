'use client'

import * as React from 'react'

import { LabelledCheckbox } from '@/components/molecules/LabelledCheckbox'

import { twMerge } from '@/lib/tailwind'

import { WritingToolsSection } from './writing-tools-section'

import type { DropTargetProps } from '../hooks/use-image-drag-and-drop'

export function ImageUploaderSection(props: {
  isDragging: boolean
  dropTargetProps: DropTargetProps
  horizontalImages: boolean
  appendToFileEnd: boolean
  onHorizontalImagesChange: (value: boolean) => void
  onAppendToFileEndChange: (value: boolean) => void
}) {
  return (
    <WritingToolsSection title="Image Uploader">
      <div
        className={twMerge(
          'tw:h-[200px] tw:text-[1.5rem] tw:font-bold tw:leading-[1.2] tw:text-center tw:p-[15px]',
          props.isDragging ? 'tw:text-inherit' : 'tw:text-gray-300',
        )}
        {...props.dropTargetProps}
      >
        <div
          className={twMerge(
            `tw:grid tw:place-items-center tw:w-full tw:h-full tw:pointer-events-none
            tw:border-dashed tw:border-2`,
            props.isDragging ? 'tw:border-(--header-color)' : 'tw:border-(--window-bkg-color)',
          )}
        >
          <div
            className="tw:text-[0.85rem] tw:font-semibold tw:tracking-[0.02em] tw:uppercase
              tw:opacity-[0.85]"
          >
            Image Uploader
          </div>
          Drag and drop
          <br />
          images here
        </div>
      </div>
      <form className="tw:mb-1">
        <LabelledCheckbox
          checked={props.horizontalImages}
          onChange={props.onHorizontalImagesChange}
        >
          Horizontal Images
        </LabelledCheckbox>
        <LabelledCheckbox checked={props.appendToFileEnd} onChange={props.onAppendToFileEndChange}>
          ファイル末尾に追記
        </LabelledCheckbox>
      </form>
    </WritingToolsSection>
  )
}
