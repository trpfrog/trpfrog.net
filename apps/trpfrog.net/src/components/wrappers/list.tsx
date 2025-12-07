import * as React from 'react'

import { tv } from '@/lib/tailwind'

const listStyles = tv({
  base: [
    'tw:pl-7',
    'tw:[&]:marker:text-trpfrog-600 tw:dark:[&]:marker:text-trpfrog-100',
    'tw:in-[&]:marker:text-trpfrog-500 tw:dark:in-[&]:marker:text-trpfrog-300',
    'tw:[&_&_&]:marker:text-trpfrog-300 tw:dark:[&_&_&]:marker:text-trpfrog-500',
    'tw:[&_&_&_&]:marker:text-trpfrog-200 tw:dark:[&_&_&_&]:marker:text-trpfrog-600',
  ],
  variants: {
    type: {
      ul: 'tw:list-outside tw:list-disc',
      ol: 'tw:list-outside tw:list-decimal',
    },
  },
})

const itemStyle = tv({
  base: 'tw:my-1',
})

export function UnorderedList(props: React.ComponentPropsWithRef<'ul'>) {
  const { className, ref, ...rest } = props
  return <ul className={listStyles({ className, type: 'ul' })} ref={ref} {...rest} />
}

export function OrderedList(props: React.ComponentPropsWithRef<'ol'>) {
  const { className, ref, ...rest } = props
  return <ol className={listStyles({ className, type: 'ol' })} ref={ref} {...rest} />
}

export function Li(props: React.ComponentPropsWithRef<'li'>) {
  const { className, ref, ...rest } = props
  return <li className={itemStyle({ className })} ref={ref} {...rest} />
}
