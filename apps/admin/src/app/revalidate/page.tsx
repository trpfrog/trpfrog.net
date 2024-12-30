'use client'

import { Table, Title } from '@mantine/core'
import { cachedPaths, cacheTags } from '@trpfrog.net/constants'
import { typedObjectEntries } from '@trpfrog.net/utils'

import { RevalidateButton } from './RevalidateButton'

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
