import { useState } from 'react'

import { Pagination, Table, Image } from '@mantine/core'
import useSWRImmutable from 'swr/immutable'

import { fetchImageRecords } from './actions'

export function AllImages() {
  const [page, setPage] = useState(1)

  const { data: currentImageMetadata } = useSWRImmutable(
    `all-ai-icons-${page}`,
    () =>
      fetchImageRecords({
        page,
        iconsPerPage: 10,
      }),
    {
      keepPreviousData: true,
    },
  )

  if (!currentImageMetadata) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Pagination total={currentImageMetadata.numPages} onChange={setPage} value={page} />
      <Table striped className="my-4 w-full table-fixed">
        <Table.Tbody>
          {currentImageMetadata.result.map(image => (
            <Table.Tr key={image.id}>
              <Table.Td>
                <Image radius="md" src={image.imageUri} alt="Generated AI icon" />
              </Table.Td>
              <Table.Td>{image.id}</Table.Td>
              <Table.Td>{image.prompt.text}</Table.Td>
              <Table.Td>{image.prompt.translated}</Table.Td>
              <Table.Td>{image.modelName}</Table.Td>
              <Table.Td>{image.prompt.author}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
