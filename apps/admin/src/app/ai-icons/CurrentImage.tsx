'use client'

import { Badge, Button, Title } from '@mantine/core'
import useSWR from 'swr'

import { fetchCurrentStatus, getCurrent, updateCurrent } from './actions'
import { IconDetail } from './IconDetail'

export function CurrentImage() {
  const { data: currentImageMetadata, mutate: mutateImageMetadata } = useSWR('ai-icons', getCurrent)

  const { data: currentStatus, mutate: mutateCurrentStatus } = useSWR(
    'ai-icons-status',
    fetchCurrentStatus,
  )

  if (!currentImageMetadata) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Badge color={currentStatus?.shouldUpdate ? 'red' : 'green'} my="sm">
        {currentStatus?.shouldUpdate ? 'Stale' : 'Up to Date'}
      </Badge>
      <IconDetail
        imageUri={currentImageMetadata.imageUri}
        prompt={currentImageMetadata.prompt.text}
        translatedPrompt={currentImageMetadata.prompt.translated}
        imageId={currentImageMetadata.id}
        createdAt={new Date(currentImageMetadata.createdAt)}
        modelName={currentImageMetadata.modelName}
        llmModelName={currentImageMetadata.prompt.author}
        deletedAt={currentImageMetadata.deletedAt ? new Date(currentImageMetadata.deletedAt) : null}
        rawMetadata={currentImageMetadata}
      />

      <Title order={3} my="sm">
        Operations
      </Title>
      <div>
        <div className="flex flex-wrap gap-2">
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
