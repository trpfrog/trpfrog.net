'use client'

import { Title } from '@mantine/core'

import { CurrentImage } from './CurrentImage'

export default function AiIcons() {
  return (
    <div>
      <Title order={2} mb={4}>
        Current Icon
      </Title>
      <CurrentImage />
    </div>
  )
}
