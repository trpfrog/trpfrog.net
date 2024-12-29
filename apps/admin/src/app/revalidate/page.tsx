'use client'

import { useCallback, useDeferredValue, useState } from 'react'

import { Button, Table, TextInput, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { cachedPaths, cacheTags } from '@trpfrog.net/constants'
import { typedObjectEntries } from '@trpfrog.net/utils'
import { match } from 'ts-pattern'

import { revalidate } from './actions'

function RevalidateButton(
  props:
    | { path: string; tag?: undefined }
    | { path?: undefined; tag: string | ((tag: string) => string) },
) {
  const [status, setStatus] = useState<'idle' | 'revalidating' | 'revalidated' | 'error'>('idle')
  const [userInput, setUserInput] = useState('')
  const defaultUserInput = useDeferredValue(userInput)

  const handleClick = useCallback(() => {
    const targetFn = props.path ?? props.tag
    const target = typeof targetFn === 'function' ? targetFn(userInput) : targetFn
    modals.openConfirmModal({
      title: props.path
        ? `パス "${target}" を revalidate しますか？`
        : `タグ "${target}" を revalidate しますか？`,
      labels: { confirm: 'Revalidate', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setStatus('revalidating')
        revalidate(props.path ? 'path' : 'tag', target)
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
  }, [props.path, props.tag, userInput])

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
        w={120}
        onClick={handleClick}
        disabled={
          status === 'revalidating' ||
          status === 'revalidated' ||
          (typeof props.tag === 'function' && userInput === '')
        }
        color={status === 'revalidated' ? 'teal' : undefined}
      >
        {match(status)
          .with('idle', () => 'Revalidate')
          .with('revalidating', () => 'Revalidating...')
          .with('revalidated', () => 'Revalidated!')
          .with('error', () => 'Error Cccurred')
          .exhaustive()}
      </Button>
    </div>
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
        {typedObjectEntries(cacheTags).map(([key, value]) => {
          const titleTag = typeof value.tag === 'function' ? value.tag('<slug>') : value.tag
          return (
            <Table.Tr key={key}>
              <Table.Td>{titleTag}</Table.Td>
              <Table.Td>{value.description}</Table.Td>
              <Table.Td>
                <RevalidateButton tag={value.tag} />
              </Table.Td>
            </Table.Tr>
          )
        })}
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
      {Object.keys(cachedPaths).length > 0 && (
        <>
          <Title order={3} my="md">
            Paths
          </Title>
          <CachedPathsTable />
        </>
      )}
    </>
  )
}
