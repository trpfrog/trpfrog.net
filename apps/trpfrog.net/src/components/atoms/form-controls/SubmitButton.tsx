'use client'

import * as React from 'react'

import { Button } from '@ui-sdk/react/button'

import { tv } from '@/lib/tailwind'

const style = tv({
  base: [
    'tw:cursor-pointer tw:rounded-md tw:bg-trpfrog-500 tw:px-2.5 tw:py-1.5 tw:align-top tw:text-white',
    'tw:data-disabled:cursor-default tw:data-disabled:opacity-50',
  ],
})

export function SubmitButton(props: { children: React.ReactNode; className?: string }) {
  return (
    <Button type="submit" className={style({ className: props.className })}>
      {props.children}
    </Button>
  )
}
