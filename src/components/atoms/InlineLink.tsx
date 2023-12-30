import { tv } from 'tailwind-variants'

import { A, AProps } from '@/components/wrappers/A'

export const inlineLinkStyle = tv({
  base: [
    'tw-inline tw-underline',
    'tw-text-[forestgreen] visited:tw-text-[olive]',
    'dark:tw-text-trpfrog-100 dark:visited:tw-text-trpfrog-400',
  ],
})

export function InlineLink(props: AProps) {
  const { className, ...rest } = props
  return <A className={inlineLinkStyle({ className })} {...rest} />
}
