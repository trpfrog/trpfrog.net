'use client'

import * as React from 'react'

import { Field, FieldLabel } from '@ui-sdk/react/field'
import { NumberInput, NumberInputControl, NumberInputGroup } from '@ui-sdk/react/number-input'

import { fieldBox } from './fieldBox'

export function NumberField(props: {
  /** 入力欄の後ろに付くラベル (単位など) */
  label: React.ReactNode
  value: number
  min?: number
  max?: number
  onValueChange: (value: number) => void
}) {
  return (
    <Field className="tw:inline-flex tw:items-center tw:gap-1">
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
          <NumberInputControl className={fieldBox({ className: 'tw:w-24' })} />
        </NumberInputGroup>
      </NumberInput>
      <FieldLabel>{props.label}</FieldLabel>
    </Field>
  )
}
