import React from 'react'

import Link from 'next/link'

import styles from './index.module.scss'

type LinkProps = Omit<Parameters<typeof Link>[0], 'href'> & {
  href: `/${string}`
}
type ButtonProps = React.ComponentProps<'button'>
type DivProps = React.ComponentProps<'div'>
type AProps = React.ComponentProps<'a'>

type Props =
  | DivProps
  | ({ onClick: ButtonProps['onClick'] } & ButtonProps)
  | ({ externalLink?: false } & LinkProps)
  | ({ externalLink: true } & AProps)

type TagType = 'div' | 'button' | 'a' | 'Link'

function getType<P extends Props>(props: P): TagType {
  if ('onClick' in props) {
    return 'button'
  }
  if ('externalLink' in props && props.externalLink) {
    return 'a'
  }
  if ('href' in props) {
    return 'Link'
  }
  return 'div'
}

function Wrapper<T extends TagType>(
  props: { tag: T } & (T extends infer U extends 'a' | 'div' | 'button'
    ? React.ComponentProps<U>
    : LinkProps),
) {
  const { tag, ...rest } = props

  switch (tag) {
    case 'Link':
      // @ts-ignore
      return <Link {...(rest as LinkProps)} />
    case 'a':
      return (
        <a {...(rest as AProps)} target="_blank" rel="noreferrer noopener" />
      )
    case 'button':
      return <button {...(rest as ButtonProps)} />
    case 'div':
      return <div {...(rest as DivProps)} />
  }
}

export default function Button(props: Props) {
  const tag = getType(props)
  const { className = '', ...rest } = props
  return (
    <Wrapper {...rest} tag={tag} className={`${styles.button} ${className}`} />
  )
}
