'use client'

import { ReactNode, useCallback, useDeferredValue, useState } from 'react'

import { Button, Text, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAtomValue } from 'jotai'
import { match } from 'ts-pattern'

import { revalidate } from './actions'

import { websiteOriginAtom } from '@/atom/origin'

export function RevalidateButton(
  props: (
    | { path: string; tag?: undefined }
    | { path?: undefined; tag: string | ((tag: string) => string) }
  ) & {
    children?: ReactNode
    color?: string
  },
) {
  const [status, setStatus] = useState<'idle' | 'revalidating' | 'revalidated' | 'error'>('idle')
  const [userInput, setUserInput] = useState('')
  const defaultUserInput = useDeferredValue(userInput)
  const origin = useAtomValue(websiteOriginAtom)

  const handleClick = useCallback(() => {
    const targetFn = props.path ?? props.tag
    const target = typeof targetFn === 'function' ? targetFn(userInput) : targetFn
    modals.openConfirmModal({
      title: props.path
        ? `パス "${target}" を revalidate しますか？`
        : `タグ "${target}" を revalidate しますか？`,
      children: <Text size="xs">向き先: {origin}</Text>,
      labels: { confirm: 'Revalidate', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setStatus('revalidating')
        revalidate(origin, props.path ? 'path' : 'tag', target)
          .then(ok => {
            setStatus(ok ? 'revalidated' : 'error')
          })
          .catch(e => {
            console.error(e)
            setStatus('error')
          })
          .finally(() => {
            setTimeout(() => {
              setStatus('idle')
            }, 2000)
          })
      },
    })
  }, [props.path, props.tag, userInput, origin])

  return (
    <div className="flex flex-wrap gap-2">
      {typeof props.tag === 'function' && (
        <TextInput
          placeholder="Slug"
          w={120}
          value={defaultUserInput}
          onChange={e => setUserInput(e.currentTarget.value)}
        />
      )}
      <Button
        w={props.children ? undefined : 120}
        onClick={handleClick}
        disabled={
          status === 'revalidating' ||
          status === 'revalidated' ||
          (typeof props.tag === 'function' && userInput === '')
        }
        color={status === 'revalidated' ? 'teal' : props.color}
      >
        {match(status)
          .with('idle', () => props.children ?? 'Revalidate')
          .with('revalidating', () => 'Revalidating...')
          .with('revalidated', () => 'Revalidated!')
          .with('error', () => 'Error Cccurred')
          .exhaustive()}
      </Button>
    </div>
  )
}
