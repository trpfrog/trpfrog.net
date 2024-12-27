'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { forbidden } from 'next/navigation'

import { env } from '@/env/server'

const client = createTrpFrogImageGenerationClient('production')

function promiseTimeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function requestUpdateIcon() {
  const apiKey = env.TRPFROG_FUNCTIONS_SECRET
  if (apiKey == null) {
    forbidden()
  }

  // ランダムに 0 〜 5 秒待ち、同時にリクエストを送りにくくする
  // 画像更新リクエストを投げているだけなので、遅延によるUXへの影響は考えなくて良い
  await promiseTimeout(Math.random() * 5000)

  await client.update.$post({
    query: {},
    header: {
      'x-api-key': apiKey,
    },
  })
}
