import { ComponentPropsWithoutRef } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { tv } from '@/lib/tailwind/variants'

const style = tv({
  base: [
    'tw-text-center tw-font-mplus-rounded tw-font-bold',
    'tw-text-trpfrog-700 dark:tw-text-trpfrog-200',
  ],
})

interface OnBodyHeadingProps extends ComponentPropsWithoutRef<'h1'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  icon?: IconProp
}

export function OnBodyHeading(props: OnBodyHeadingProps) {
  const { className, level, children, icon, ...rest } = props
  const Wrapper = level ? (`h${level}` as const) : 'div'

  return (
    <Wrapper className={style({ className })} {...rest}>
      {icon && <FontAwesomeIcon icon={icon} className="tw-mr-1" />}
      {children}
      {icon && <FontAwesomeIcon icon={icon} className="tw-ml-1" />}
    </Wrapper>
  )
}
