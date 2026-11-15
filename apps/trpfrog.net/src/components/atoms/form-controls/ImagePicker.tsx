'use client'

import * as React from 'react'

import { FileInput, FileInputTrigger } from '@ui-sdk/react/file-input'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    root: 'tw:inline-flex tw:items-center tw:gap-2',
    trigger: [
      'tw:cursor-pointer tw:rounded-full tw:bg-trpfrog-200 tw:px-3 tw:py-0.5 tw:text-black',
      'tw:hover:bg-trpfrog-400 tw:active:bg-trpfrog-500',
    ],
  },
})()

export function ImagePicker(props: { onPick: (file: File) => void; children: React.ReactNode }) {
  return (
    <FileInput
      accept="image/*"
      className={styles.root()}
      onValueChange={files => {
        if (files[0]) props.onPick(files[0])
      }}
    >
      {state => (
        <>
          <FileInputTrigger className={styles.trigger()}>{props.children}</FileInputTrigger>
          <span>{state.value[0]?.name ?? '選択されていません'}</span>
        </>
      )}
    </FileInput>
  )
}
