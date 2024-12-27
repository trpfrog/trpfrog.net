'use client'

import { Title } from '@mantine/core'

import { AllImages } from './AllImages'
import { CurrentImage } from './CurrentImage'

export default function AiIcons() {
  return (
    <div>
      <Title order={2} my="lg">
        Current Icon
      </Title>
      <CurrentImage />
      <Title order={2} my="lg">
        All Icons
      </Title>
      <AllImages />
    </div>
  )
}
