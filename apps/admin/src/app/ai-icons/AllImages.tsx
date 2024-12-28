import { useState } from 'react'

import { Pagination, Table, Image, Modal, Button, Title } from '@mantine/core'
import { format } from 'date-fns'
import useSWRImmutable from 'swr/immutable'

import { deleteImage, fetchImageRecords, undeleteImage } from './actions'
import { IconDetail } from './IconDetail'

function DeleteButton(props: {
  imageId: string
  onDeleteButtonClicked: (imageId: string) => void
  onUndeleteButtonClicked: (imageId: string) => void
  isDeleted: boolean
}) {
  if (props.isDeleted) {
    return (
      <Button color="red" onClick={() => props.onUndeleteButtonClicked(props.imageId)}>
        Restore Image
      </Button>
    )
  } else {
    return (
      <Button color="red" onClick={() => props.onDeleteButtonClicked(props.imageId)}>
        Delete Image
      </Button>
    )
  }
}

export function AllImages() {
  const [page, setPage] = useState(1)
  const [activeModalId, setActiveModalId] = useState<null | string>(null)

  const { data: currentImageMetadata, mutate: mutateImageMetadata } = useSWRImmutable(
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
      <div className="overflow-x-scroll">
        <Table striped className="my-4 w-full table-fixed">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Icon</Table.Th>
              <Table.Th>Prompt</Table.Th>
              <Table.Th>Translated Prompt</Table.Th>
              <Table.Th>Created At</Table.Th>
              <Table.Th>Deleted At</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {currentImageMetadata.result.map(image => (
              <Table.Tr key={image.id}>
                <Table.Td>
                  <Image
                    radius="md"
                    src={image.imageUri}
                    alt="Generated AI icon"
                    className="aspect-square min-w-[50px] max-w-[300px]"
                  />
                </Table.Td>
                <Table.Td>{image.prompt.text}</Table.Td>
                <Table.Td>{image.prompt.translated}</Table.Td>
                <Table.Td>{format(new Date(image.createdAt), 'yyyy-MM-dd HH:mm:ss')}</Table.Td>
                <Table.Td>
                  {image.deletedAt
                    ? format(new Date(image.deletedAt), 'yyyy-MM-dd HH:mm:ss')
                    : 'N/A'}
                </Table.Td>
                <Table.Td>
                  <Button onClick={() => setActiveModalId(image.id)}>Detail</Button>
                  <Modal
                    opened={activeModalId === image.id}
                    onClose={() => setActiveModalId(null)}
                    title="Detail"
                    size="xl"
                  >
                    <IconDetail
                      imageUri={image.imageUri}
                      prompt={image.prompt.text}
                      translatedPrompt={image.prompt.translated}
                      imageId={image.id}
                      createdAt={new Date(image.createdAt)}
                      modelName={image.modelName}
                      deletedAt={image.deletedAt ? new Date(image.deletedAt) : null}
                      llmModelName={image.prompt.author}
                      rawMetadata={image}
                    />
                    <Title order={3} my="sm">
                      Operations
                    </Title>
                    <div className="flex gap-2">
                      <DeleteButton
                        imageId={image.id}
                        isDeleted={!!image.deletedAt}
                        onDeleteButtonClicked={async imageId => {
                          await deleteImage(imageId)
                          mutateImageMetadata()
                        }}
                        onUndeleteButtonClicked={async imageId => {
                          await undeleteImage(imageId)
                          mutateImageMetadata()
                        }}
                      />
                    </div>
                  </Modal>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  )
}
