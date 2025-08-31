'use client'

import { useMemo, useState } from 'react'

import {
  Badge,
  Button,
  Divider,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'

import {
  fetchSeedWords,
  generateImageFromText,
  generatePromptFromWords,
  type GeneratedPrompt,
} from '../actions'
import { useAtom } from 'jotai'
import { imageGenerationOriginAtom } from '@/atom/origin'

export default function PromptDemoPage() {
  const [wordsInput, setWordsInput] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null)
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null)
  const [useWhich, setUseWhich] = useState<'en' | 'ja'>('ja')
  const [loading, setLoading] = useState<'seed' | 'prompt' | 'image' | null>(null)
  const [origin] = useAtom(imageGenerationOriginAtom)

  const parsedWords = useMemo(
    () =>
      wordsInput
        .split(/[\n,\s]+/)
        .map(w => w.trim())
        .filter(Boolean),
    [wordsInput],
  )

  return (
    <Stack>
      <Title order={2}>プロンプト自動生成デモ</Title>
      <Text c="dimmed">語群から最終プロンプト（英/日）を生成します。</Text>

      <Group align="end">
        <TextInput
          label="語群 (カンマ/空白/改行区切り)"
          placeholder="castle, wizard, moonlight ..."
          value={wordsInput}
          onChange={e => setWordsInput(e.currentTarget.value)}
          className="min-w-[360px]"
        />
        <Button
          loading={loading === 'seed'}
          onClick={async () => {
            setLoading('seed')
            try {
              const w = await fetchSeedWords(origin)
              setWords(w)
              setWordsInput(w.join(', '))
            } finally {
              setLoading(null)
            }
          }}
        >
          ランダム語を取得
        </Button>
        <Button
          color="blue"
          loading={loading === 'prompt'}
          onClick={async () => {
            setLoading('prompt')
            try {
              const p = await generatePromptFromWords(parsedWords, origin)
              setPrompt(p)
              setImageDataUrl(null)
              setWords(parsedWords)
            } finally {
              setLoading(null)
            }
          }}
          disabled={parsedWords.length === 0}
        >
          プロンプト生成
        </Button>
      </Group>

      {words.length > 0 && (
        <Text size="sm" c="dimmed">
          使用語: {words.join(', ')}
        </Text>
      )}

      {prompt && (
        <Stack>
          <Divider my="sm" />
          <Title order={3}>生成結果</Title>
          <Group>
            <Badge>LLM: {prompt.author}</Badge>
          </Group>
          <Textarea label="English Prompt" value={prompt.text} autosize readOnly />
          <Textarea label="日本語プロンプト" value={prompt.translated} autosize readOnly />

          <Group align="end">
            <SegmentedControl
              value={useWhich}
              onChange={v => setUseWhich(v as 'en' | 'ja')}
              data={[
                { value: 'en', label: '英語' },
                { value: 'ja', label: '日本語' },
              ]}
            />
            <Button
              color="green"
              loading={loading === 'image'}
              onClick={async () => {
                if (!prompt) return
                setLoading('image')
                try {
                  const sel = useWhich === 'en' ? prompt.text : prompt.translated
                  const img = await generateImageFromText(sel, origin)
                  setImageDataUrl(img.dataUrl)
                } finally {
                  setLoading(null)
                }
              }}
            >
              このプロンプトで画像生成
            </Button>
          </Group>

          {imageDataUrl && (
            <div>
              <Title order={4} my="sm">
                生成画像
              </Title>
              <Image src={imageDataUrl} alt="generated" radius="md" className="max-w-[512px]" />
            </div>
          )}
        </Stack>
      )}
    </Stack>
  )
}
