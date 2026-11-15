'use client'

import * as React from 'react'

import { Input } from '@ui-sdk/react/input'
import type { Except } from 'type-fest'

import { fieldBox } from './fieldBox'

type TextInputProps = Except<React.ComponentProps<typeof Input>, 'className'> & {
  className?: string
}

export function TextInput(props: TextInputProps) {
  const { className, ...rest } = props
  return <Input {...rest} className={fieldBox({ className })} />
}
