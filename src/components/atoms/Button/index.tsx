import * as React from 'react'

import classNames from 'classnames'
import Link from 'next/link'

import { A } from '@/components/wrappers'

import { isInternalLink } from '@/lib/isInternalLink'
import type { SelectedRequired } from '@/lib/types'

import styles from './index.module.scss'

type LinkProps = Omit<Parameters<typeof Link>[0], 'href'> & {
  href: `/${string}`
}
type ButtonProps = React.ComponentPropsWithoutRef<'button'>
type DivProps = React.ComponentPropsWithoutRef<'div'>
type AProps = React.ComponentPropsWithoutRef<'a'>

type TypeSpecificProps =
  | ({ tag?: undefined; externalLink?: false } & DivProps)
  | ({ tag?: undefined; externalLink?: false } & SelectedRequired<
      ButtonProps,
      'onClick'
    >)
  | ({ tag?: undefined; externalLink?: false } & LinkProps)
  | ({ tag?: undefined; externalLink: true } & AProps)
  | ({ tag: 'Link'; externalLink?: false } & LinkProps)
  | ({ tag: 'a'; externalLink: true } & AProps)
  | ({ tag: 'button'; externalLink?: false } & ButtonProps)
  | ({ tag: 'div'; externalLink?: false } & DivProps)

type Props = TypeSpecificProps & {
  disabled?: boolean
}

type TagType = 'div' | 'button' | 'a' | 'Link'

function getType<P extends Props>(props: P): TagType {
  if ('tag' in props && props.tag) {
    return props.tag
  }
  if ('onClick' in props) {
    return 'button'
  }
  if ('externalLink' in props) {
    return props.externalLink ? 'a' : 'Link'
  }
  if ('href' in props) {
    if (isInternalLink(props.href)) {
      return 'Link'
    } else {
      return 'a'
    }
  }
  return 'div'
}

function Wrapper<T extends TagType>(
  props: { tag: T } & (T extends infer U extends 'a' | 'div' | 'button'
    ? React.ComponentPropsWithoutRef<U>
    : LinkProps),
) {
  const { tag, ...rest } = {
    ...props,
    'data-testid': 'button-component',
  }

  switch (tag) {
    case 'Link':
      return <Link {...(rest as LinkProps)} />
    case 'a':
      return <A openInNewTab {...(rest as AProps)} />
    case 'button':
      return <button {...(rest as ButtonProps)} />
    case 'div':
      return <div {...(rest as DivProps)} />
  }
}

export function Button(props: Props) {
  const tag = getType(props)
  const { className = '', externalLink, ...rest } = props
  return (
    <Wrapper
      {...rest}
      tag={tag}
      className={classNames(
        styles.button,
        props.disabled && styles.disabled,
        className,
      )}
    />
  )
}
