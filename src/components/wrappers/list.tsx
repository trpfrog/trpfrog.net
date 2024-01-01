import * as React from 'react'

import { tv } from 'tailwind-variants'

const listStyles = tv({
  base: [
    'tw-pl-7',
    'marker:[&]:tw-text-trpfrog-600 dark:marker:[&]:tw-text-trpfrog-100',
    'marker:[&_&]:tw-text-trpfrog-500 dark:marker:[&_&]:tw-text-trpfrog-300',
    'marker:[&_&_&]:tw-text-trpfrog-300 dark:marker:[&_&_&]:tw-text-trpfrog-500',
    'marker:[&_&_&_&]:tw-text-trpfrog-200 dark:marker:[&_&_&_&]:tw-text-trpfrog-600',
  ],
  variants: {
    type: {
      ul: 'tw-list-outside tw-list-disc',
      ol: 'tw-list-outside tw-list-decimal',
    },
  },
})

const itemStyle = tv({
  base: 'tw-my-1',
})

export const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(function UnorderedList(props, ref) {
  const { className, ...rest } = props
  return (
    <ul className={listStyles({ className, type: 'ul' })} ref={ref} {...rest} />
  )
})

export const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.ComponentProps<'ol'>
>(function OrderedList(props, ref) {
  const { className, ...rest } = props
  return (
    <ol className={listStyles({ className, type: 'ol' })} ref={ref} {...rest} />
  )
})

export const Li = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  function ListItem(props, ref) {
    const { className, ...rest } = props
    return <li className={itemStyle({ className })} ref={ref} {...rest} />
  },
)
