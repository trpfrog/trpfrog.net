import React from 'react'

import classNames from 'classnames'
import Link from 'next/link'

import { OpenInNewTab } from '@/components/atoms/OpenInNewTab'

import { DEVELOPMENT_HOST, PRODUCTION_HOST } from '@/lib/constants'
import type { SelectedRequired } from '@/lib/types'

import styles from './index.module.scss'

type LinkProps = Omit<Parameters<typeof Link>[0], 'href'> & {
  href: `/${string}`
}
type ButtonProps = React.ComponentPropsWithoutRef<'button'>
type DivProps = React.ComponentPropsWithoutRef<'div'>
type AProps = React.ComponentPropsWithoutRef<'a'>

type TypeSpecificProps =
  | ({ externalLink?: false } & DivProps)
  | ({ externalLink?: false } & SelectedRequired<ButtonProps, 'onClick'>)
  | ({ externalLink?: false } & LinkProps)
  | ({ externalLink: true } & AProps)

type Props = TypeSpecificProps & {
  disabled?: boolean
}

type TagType = 'div' | 'button' | 'a' | 'Link'

function getType<P extends Props>(props: P): TagType {
  if ('onClick' in props) {
    return 'button'
  }
  if ('externalLink' in props) {
    return props.externalLink ? 'a' : 'Link'
  }
  if ('href' in props) {
    const isInternalLink = [
      '/',
      '#',
      'mailto:',
      PRODUCTION_HOST,
      DEVELOPMENT_HOST,
    ].some(prefix => props.href.startsWith(prefix))

    if (isInternalLink) {
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
      return <OpenInNewTab {...(rest as AProps)} />
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
