'use client'

import { useState } from 'react'

import { Button, Image, Stack, Textarea, Title } from '@mantine/core'
import { useAtom } from 'jotai'

import { generateImageFromText } from '../actions'

import { imageGenerationOriginAtom } from '@/atom/origin'

export default function TextToImageDemoPage() {
  const [text, setText] = useState('')
  const [img, setImg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [origin] = useAtom(imageGenerationOriginAtom)

  return (
    <Stack>
      <Title order={2}>テキストから画像生成デモ</Title>
      <Textarea
        label="テキスト"
        placeholder="e.g. tsmami floating in surreal space with glowing shapes"
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        autosize
        minRows={3}
      />
      <Button
        color="green"
        loading={loading}
        onClick={async () => {
          setLoading(true)
          try {
            const res = await generateImageFromText(text, origin)
            setImg(res.dataUrl)
          } finally {
            setLoading(false)
          }
        }}
        disabled={text.trim().length === 0}
      >
        画像を生成
      </Button>
      {img && <Image src={img} alt="generated" radius="md" className="max-w-[512px]" />}
    </Stack>
  )
}
