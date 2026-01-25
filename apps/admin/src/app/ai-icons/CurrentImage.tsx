'use client'

import { Badge, Button, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
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
            onClick={async () => {
              try {
                await Promise.all([mutateImageMetadata(), mutateCurrentStatus()])
              } catch (error) {
                notifications.show({
                  color: 'red',
                  title: '再読み込みに失敗しました',
                  message: '時間をおいて再試行してください。',
                })
                console.error('Failed to reload current image metadata.', error)
              }
            }}
          >
            Reload
          </Button>
          <Button
            color="blue"
            onClick={async () => {
              try {
                await updateCurrent(false)
                notifications.show({
                  color: 'green',
                  title: '更新を要求しました',
                  message: '更新要求を送信しました。',
                })
              } catch (error) {
                notifications.show({
                  color: 'red',
                  title: '更新要求に失敗しました',
                  message: '時間をおいて再試行してください。',
                })
                console.error('Failed to request update.', error)
              }
            }}
          >
            Request Update
          </Button>
          <Button
            color="red"
            onClick={async () => {
              const res = window.confirm('本当に強制的に更新しますか？')
              if (!res) {
                return
              }
              try {
                await updateCurrent(true)
                notifications.show({
                  color: 'green',
                  title: '強制更新を要求しました',
                  message: '強制更新要求を送信しました。',
                })
              } catch (error) {
                notifications.show({
                  color: 'red',
                  title: '強制更新要求に失敗しました',
                  message: '時間をおいて再試行してください。',
                })
                console.error('Failed to request forced update.', error)
              }
            }}
          >
            Update Forcefully
          </Button>
        </div>
      </div>
    </div>
  )
}
