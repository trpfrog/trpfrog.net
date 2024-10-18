import * as React from 'react'
import { HTMLInputTypeAttribute } from 'react'

import { addTwModifier } from '@/lib/tailwind/helpers'
import { tv } from '@/lib/tailwind/variants'

type Props = React.ComponentPropsWithRef<'input'>

const inputBoxStyle = tv({
  base: 'tw-rounded-md tw-bg-gray-200 tw-p-1 dark:tw-bg-gray-700',
})

const style = tv({
  variants: {
    type: {
      text: inputBoxStyle(),
      number: inputBoxStyle(),
      submit: [
        'tw-p-1 tw-px-2.5 tw-py-1.5 tw-text-white',
        'tw-cursor-pointer tw-rounded-md tw-bg-trpfrog-500 tw-align-top',
      ].join(' '),
      file: addTwModifier('file:', [
        'tw-rounded-full tw-border-none tw-bg-trpfrog-200 tw-px-3',
        'tw-text-black hover:tw-bg-trpfrog-400 active:tw-bg-trpfrog-500',
      ]),
      checkbox: 'tw-accent-trpfrog-200',
    } satisfies Partial<Record<HTMLInputTypeAttribute, string>>,
  },
})

function hasVariant(type: string | undefined): type is keyof typeof style.variants.type {
  return type !== undefined && type in style.variants.type
}

export function Input(props: Props) {
  const { className, ref, ...rest } = props
  const type = hasVariant(props.type) ? props.type : undefined

  return <input ref={ref} className={style({ className, type })} {...rest} />
}
