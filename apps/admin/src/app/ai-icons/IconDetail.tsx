import { Image, JsonInput, Table, Title } from '@mantine/core'
import { differenceInMinutes, format } from 'date-fns'

interface IconDetailProps {
  imageUri: string
  prompt: string
  translatedPrompt: string
  imageId: string
  createdAt: Date
  modelName: string
  llmModelName: string
  deletedAt: Date | null
  rawMetadata: Record<string, unknown> | null
}

export function IconDetail(props: IconDetailProps) {
  const tableContents = [
    { key: 'Prompt', value: props.prompt },
    { key: 'Translated Prompt', value: props.translatedPrompt },
    { key: 'Image URI', value: props.imageUri },
    { key: 'Image ID', value: props.imageId },
    {
      key: 'Created At',
      value:
        format(props.createdAt, 'yyyy-MM-dd HH:mm:ss') +
        ` (${differenceInMinutes(new Date(), props.createdAt)} minutes ago)`,
    },
    {
      key: 'Deleted At',
      value: props.deletedAt ? format(props.deletedAt, 'yyyy-MM-dd HH:mm:ss') : 'N/A',
    },
    { key: 'Image Generator', value: props.modelName },
    { key: 'Language Model', value: props.llmModelName },
    { key: 'Resource URI', value: props.imageUri },
  ]

  return (
    <>
      <Image radius="md" h={500} w={500} src={props.imageUri} alt="Generated AI icon" />
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
        value={JSON.stringify(props.rawMetadata, null, 2).trim()}
        autosize
        wrap="off"
        readOnly
      />
    </>
  )
}
