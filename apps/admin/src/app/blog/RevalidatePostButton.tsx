'use client'

import { useCallback, useState } from 'react'

import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { cacheTags } from '@trpfrog.net/constants'
import { match } from 'ts-pattern'

import { revalidate } from '../revalidate/actions'

export function RevalidatePostButton(props: { slug: string }) {
  const [status, setStatus] = useState<'idle' | 'revalidating' | 'revalidated' | 'error'>('idle')

  const handleClick = useCallback(() => {
    modals.openConfirmModal({
      title: `Revalidate: ${props.slug}`,
      children: (
        <Text size="sm">
          ブログ記事 {props.slug} と<br />
          記事一覧画面を revalidate します。
        </Text>
      ),
      labels: { confirm: 'Revalidate', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setStatus('revalidating')
        Promise.all([
          revalidate('tag', cacheTags.blogList.tag),
          revalidate('tag', cacheTags.blogSlug.tag(props.slug)),
        ])
          .then(res => {
            setStatus(res.every(ok => ok) ? 'revalidated' : 'error')
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
  }, [props.slug])

  return (
    <Button
      w={120}
      onClick={handleClick}
      disabled={status === 'revalidating' || status === 'revalidated'}
      color={status === 'revalidated' ? 'teal' : undefined}
    >
      {match(status)
        .with('idle', () => 'Revalidate')
        .with('revalidating', () => 'Revalidating...')
        .with('revalidated', () => 'Revalidated!')
        .with('error', () => 'Error Cccurred')
        .exhaustive()}
    </Button>
  )
}
