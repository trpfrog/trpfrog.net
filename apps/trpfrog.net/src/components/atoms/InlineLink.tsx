import { A, AProps } from '@/components/wrappers/A'

import { tv } from '@/lib/tailwind/variants'

const inlineLinkStyle = tv({
  base: [
    'tw:inline tw:underline',
    'tw:text-[forestgreen] tw:visited:text-[olive]',
    'tw:dark:text-trpfrog-100 tw:dark:visited:text-trpfrog-400',
  ],
})

export function InlineLink(props: AProps) {
  const { className, ...rest } = props
  return <A className={inlineLinkStyle({ className })} {...rest} />
}
