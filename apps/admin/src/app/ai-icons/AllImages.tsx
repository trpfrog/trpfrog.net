import { useState } from 'react'

import { Pagination, Table, Image, Modal, Button } from '@mantine/core'
import { format } from 'date-fns'
import useSWRImmutable from 'swr/immutable'

import { fetchImageRecords } from './actions'
import { IconDetail } from './IconDetail'

export function AllImages() {
  const [page, setPage] = useState(1)
  const [activeModalId, setActiveModalId] = useState<null | string>(null)

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
              <Table.Td>{image.prompt.text}</Table.Td>
              <Table.Td>{image.prompt.translated}</Table.Td>
              <Table.Td>{format(new Date(image.createdAt), 'yyyy-MM-dd HH:mm:ss')}</Table.Td>
              <Table.Td>
                <Button onClick={() => setActiveModalId(image.id)}>Detail</Button>
                <Modal
                  opened={activeModalId === image.id}
                  onClose={() => setActiveModalId(null)}
                  title="Detail"
                  size="70%"
                >
                  <IconDetail
                    imageUri={image.imageUri}
                    prompt={image.prompt.text}
                    translatedPrompt={image.prompt.translated}
                    imageId={image.id}
                    createdAt={new Date(image.createdAt)}
                    modelName={image.modelName}
                    rawMetadata={image}
                  />
                </Modal>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
