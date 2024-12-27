'use client'

import { Badge, Button, Image, JsonInput, Table, Title } from '@mantine/core'
import { differenceInMinutes, format } from 'date-fns'
import useSWRImmutable from 'swr/immutable'

import { fetchCurrentStatus, getCurrent, updateCurrent } from './actions'

export function CurrentImage() {
  const { data: currentImageMetadata, mutate: mutateImageMetadata } = useSWRImmutable(
    'ai-icons',
    getCurrent,
  )

  const { data: currentStatus, mutate: mutateCurrentStatus } = useSWRImmutable(
    'ai-icons-status',
    fetchCurrentStatus,
  )

  if (!currentImageMetadata) {
    return <div>Loading...</div>
  }

  const tableContents = [
    { key: 'Prompt', value: currentImageMetadata.prompt.text },
    { key: 'Translated Prompt', value: currentImageMetadata.prompt.translated },
    { key: 'Image URI', value: currentImageMetadata.imageUri },
    { key: 'Image ID', value: currentImageMetadata.id },
    {
      key: 'Created At',
      value:
        format(currentImageMetadata.createdAt, 'yyyy-MM-dd HH:mm:ss') +
        ` (${differenceInMinutes(new Date(), currentImageMetadata.createdAt)} minutes ago)`,
    },
    { key: 'Model', value: currentImageMetadata.modelName },
    { key: 'Author', value: currentImageMetadata.prompt.author },
    { key: 'Resource URI', value: currentImageMetadata.imageUri },
  ]

  return (
    <div>
      <Image
        radius="md"
        h={500}
        w={500}
        src={currentImageMetadata.imageUri}
        alt="Generated AI icon"
      />
      <Badge color={currentStatus?.shouldUpdate ? 'red' : 'green'} my="sm">
        {currentStatus?.shouldUpdate ? 'Stale' : 'Up to Date'}
      </Badge>
      <Table striped my="sm" className="w-full table-fixed">
        <Table.Tbody>
          {tableContents.map(({ key, value }) => (
            <Table.Tr key={key}>
              <Table.Th>{key}</Table.Th>
              <Table.Td>{value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Title order={3} my="sm">
        Raw Data
      </Title>
      <JsonInput
        className="w-full"
        value={JSON.stringify(currentImageMetadata, null, 2).trim()}
        autosize
        wrap="off"
        readOnly
      />

      <Title order={3} my="sm">
        Operations
      </Title>
      <div>
        <div className="flex gap-2">
          <Button
            color="blue"
            onClick={() => {
              mutateImageMetadata()
              mutateCurrentStatus()
            }}
          >
            Reload
          </Button>
          <Button
            color="blue"
            onClick={() => {
              updateCurrent(false)
            }}
          >
            Request Update
          </Button>
          <Button
            color="red"
            onClick={() => {
              const res = window.confirm('本当に強制的に更新しますか？')
              if (!res) {
                return
              }
              updateCurrent(true)
            }}
          >
            Update Forcefully
          </Button>
        </div>
      </div>
    </div>
  )
}
