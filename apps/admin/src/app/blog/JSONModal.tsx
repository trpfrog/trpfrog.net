import { useState } from 'react'

import { Button, JsonInput, Modal } from '@mantine/core'
import useSWR from 'swr'

import { fetchPostDetail } from './actions'

export function JSONModal(props: { slug: string }) {
  const [modalOpened, setModalOpened] = useState(false)
  const { data = {} } = useSWR(props.slug, fetchPostDetail)

  return (
    <div>
      <Button
        onClick={() => {
          setModalOpened(true)
        }}
      >
        View JSON
      </Button>
      <Modal
        title={props.slug}
        size="xl"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <JsonInput value={JSON.stringify(data, null, 2)} autosize readOnly />
      </Modal>
    </div>
  )
}
