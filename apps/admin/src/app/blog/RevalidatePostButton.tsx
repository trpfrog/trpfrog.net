'use client'

import { useCallback, useState } from 'react'

import { Button, Flex, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { cacheTags } from '@trpfrog.net/constants'
import { useAtomValue } from 'jotai'
import { match } from 'ts-pattern'

import { revalidate } from '../revalidate/actions'

import { websiteOriginAtom } from '@/atom/origin'

export function RevalidatePostButton(props: { slug: string }) {
  const [status, setStatus] = useState<'idle' | 'revalidating' | 'revalidated' | 'error'>('idle')
  const origin = useAtomValue(websiteOriginAtom)

  const handleClick = useCallback(() => {
    modals.openConfirmModal({
      title: `Revalidate: ${props.slug}`,
      children: (
        <Flex direction="column" gap="xs">
          <Text size="sm">
            ブログ記事 {props.slug} と<br />
            記事一覧画面を revalidate します。
          </Text>
          <Text size="xs">向き先: {origin}</Text>
        </Flex>
      ),
      labels: { confirm: 'Revalidate', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setStatus('revalidating')
        Promise.all([
          revalidate(origin, 'tag', cacheTags.blogList.tag),
          revalidate(origin, 'tag', cacheTags.blogSlug.tag(props.slug)),
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
  }, [props.slug, origin])

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
