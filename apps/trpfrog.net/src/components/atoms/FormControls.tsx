'use client'

import * as React from 'react'

import { Button } from '@ui-sdk/react/button'
import { Field, FieldLabel } from '@ui-sdk/react/field'
import { FileInput, FileInputTrigger } from '@ui-sdk/react/file-input'
import { Input } from '@ui-sdk/react/input'
import { NumberInput, NumberInputControl, NumberInputGroup } from '@ui-sdk/react/number-input'
import type { Except } from 'type-fest'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    box: 'tw:rounded-md tw:bg-gray-200 tw:p-1 tw:dark:bg-gray-700',
    submit: [
      'tw:cursor-pointer tw:rounded-md tw:bg-trpfrog-500 tw:px-2.5 tw:py-1.5 tw:align-top tw:text-white',
      'tw:data-disabled:cursor-default tw:data-disabled:opacity-50',
    ],
    numberField: 'tw:inline-flex tw:items-center tw:gap-1',
    numberControl: 'tw:w-24',
    filePicker: 'tw:inline-flex tw:items-center tw:gap-2',
    fileTrigger: [
      'tw:cursor-pointer tw:rounded-full tw:bg-trpfrog-200 tw:px-3 tw:py-0.5 tw:text-black',
      'tw:hover:bg-trpfrog-400 tw:active:bg-trpfrog-500',
    ],
  },
})()

type TextInputProps = Except<React.ComponentProps<typeof Input>, 'className'> & {
  className?: string
}

export function TextInput(props: TextInputProps) {
  const { className, ...rest } = props
  return <Input {...rest} className={styles.box({ className })} />
}

export function SubmitButton(props: { children: React.ReactNode; className?: string }) {
  return (
    <Button type="submit" className={styles.submit({ className: props.className })}>
      {props.children}
    </Button>
  )
}

export function NumberField(props: {
  /** 入力欄の後ろに付くラベル (単位など) */
  label: React.ReactNode
  value: number
  min?: number
  max?: number
  onValueChange: (value: number) => void
}) {
  return (
    <Field className={styles.numberField()}>
      <NumberInput
        value={props.value}
        min={props.min}
        max={props.max}
        step={1}
        onValueChange={value => {
          if (value != null) props.onValueChange(value)
        }}
      >
        <NumberInputGroup>
          <NumberInputControl className={styles.box({ className: styles.numberControl() })} />
        </NumberInputGroup>
      </NumberInput>
      <FieldLabel>{props.label}</FieldLabel>
    </Field>
  )
}

export function ImagePicker(props: { onPick: (file: File) => void; children: React.ReactNode }) {
  return (
    <FileInput
      accept="image/*"
      className={styles.filePicker()}
      onValueChange={files => {
        if (files[0]) props.onPick(files[0])
      }}
    >
      {state => (
        <>
          <FileInputTrigger className={styles.fileTrigger()}>{props.children}</FileInputTrigger>
          <span>{state.value[0]?.name ?? '選択されていません'}</span>
        </>
      )}
    </FileInput>
  )
}
