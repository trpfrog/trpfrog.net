'use client'

import { useCallback, useState } from 'react'

import { Button, Table, Title } from '@mantine/core'
import { cachedPaths, cacheTags } from '@trpfrog.net/constants'
import { typedObjectEntries } from '@trpfrog.net/utils'
import { match } from 'ts-pattern'

import { revalidate } from './actions'

function RevalidateButton(
  props: { path: string; tag?: undefined } | { path?: undefined; tag: string },
) {
  const [status, setStatus] = useState<'idle' | 'revalidating' | 'revalidated' | 'error'>('idle')
  const handleClick = useCallback(() => {
    const confirmMessage = props.path
      ? `次のパスを revalidate しますか？ ${props.path}`
      : `次のタグを revalidate しますか？ ${props.tag}`

    if (window.confirm(confirmMessage)) {
      setStatus('revalidating')
      revalidate(props.path ? 'path' : 'tag', props.path ?? props.tag)
        .then(ok => {
          if (ok) {
            setStatus('revalidated')
          } else {
            setStatus('error')
          }
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
    }
  }, [props.path, props.tag])

  return (
    <Button
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

function CacheTagsTable() {
  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Tag</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {typedObjectEntries(cacheTags).map(([key, value]) => (
          <Table.Tr key={key}>
            <Table.Td>{value.tag}</Table.Td>
            <Table.Td>{value.description}</Table.Td>
            <Table.Td>
              <RevalidateButton tag={value.tag} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

function CachedPathsTable() {
  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Path</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {typedObjectEntries(cachedPaths).map(([key, value]) => (
          <Table.Tr key={key}>
            <Table.Td>{value.path}</Table.Td>
            <Table.Td>{value.description}</Table.Td>
            <Table.Td>
              <RevalidateButton path={value.path} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default function RevalidatePage() {
  return (
    <>
      <Title order={2} my="lg">
        Revalidate
      </Title>
      <Title order={3} my="md">
        Cache Tags
      </Title>
      <CacheTagsTable />
      <Title order={3} my="md">
        Paths
      </Title>
      <CachedPathsTable />
    </>
  )
}
