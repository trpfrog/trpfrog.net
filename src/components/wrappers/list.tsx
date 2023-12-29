import * as React from 'react'

import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    ul: [
      'tw-list-outside tw-list-disc tw-pl-7',
      // Change marker color depending on depth
      'marker:[&]:tw-text-trpfrog-600',
      'marker:[&_&]:tw-text-trpfrog-400',
      'marker:[&_&_&]:tw-text-trpfrog-300',
      'marker:[&_&_&_&]:tw-text-trpfrog-200',
    ],
    ol: [
      'tw-list-outside tw-list-decimal tw-pl-7',
      'marker:tw-font-bold',
      // Change marker color depending on depth
      'marker:[&]:tw-text-trpfrog-700',
      'marker:[&_&]:tw-text-trpfrog-500',
      'marker:[&_&_&]:tw-text-trpfrog-400',
      'marker:[&_&_&_&]:tw-text-trpfrog-300',
    ],
    li: 'tw-my-1',
  },
})()

export const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(function UnorderedList(props, ref) {
  const { className, ...rest } = props
  return <ul className={styles.ul({ className })} ref={ref} {...rest} />
})

export const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.ComponentProps<'ol'>
>(function OrderedList(props, ref) {
  const { className, ...rest } = props
  return <ol className={styles.ol({ className })} ref={ref} {...rest} />
})

export const Li = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  function ListItem(props, ref) {
    const { className, ...rest } = props
    return <li className={styles.li({ className })} ref={ref} {...rest} />
  },
)
