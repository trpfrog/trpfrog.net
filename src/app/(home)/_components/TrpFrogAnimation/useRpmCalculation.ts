import React from 'react'

import { Queue } from '@/lib/queue'

type RpmRecord = {
  degree: number
  unixTime: number
}

function degreeMod(n: number) {
  const m = 360
  return ((n % m) + m) % m
}

// returns [-180, 180)
export function degreeDifference(prev: number, cur: number) {
  const diff = degreeMod(cur - prev)
  if (diff >= 180) {
    return diff - 360
  }
  return diff
}

const queues: Record<string, Queue<RpmRecord>> = {}

export type RpmCalculationOptions = Partial<{
  minQueueSize: number
}>

export default function useRpmCalculation(
  queueTTLMillis: number,
  options?: RpmCalculationOptions,
) {
  if (queueTTLMillis < 1) throw new Error('heapSize must be greater than 0')

  const queueId = React.useId()
  if (!queues[queueId]) {
    queues[queueId] = new Queue()
  }
  const q = queues[queueId]

  const [diffSum, setDiffSum] = React.useState(0)
  const pushDegree = React.useCallback(
    (degree: number) => {
      const curLast = q.last
      if (curLast) {
        setDiffSum(prev => prev + degreeDifference(curLast.degree, degree))
      }
      q.push({
        degree,
        unixTime: Date.now(),
      })

      setTimeout(() => {
        const removed = q.pop()
        const newFirst = q.first
        if (newFirst && removed) {
          setDiffSum(
            prev => prev - degreeDifference(removed.degree, newFirst.degree),
          )
        } else {
          setDiffSum(0)
        }
      }, queueTTLMillis)
    },
    [q, queueTTLMillis],
  )

  const firstUnixTime = q.first?.unixTime
  const lastUnixTime = q.last?.unixTime
  const rpm =
    q.items.length >= Math.max(options?.minQueueSize ?? 2, 2) &&
    firstUnixTime &&
    lastUnixTime &&
    firstUnixTime !== lastUnixTime
      ? ((diffSum / (lastUnixTime - firstUnixTime)) * 1000 * 60) / 360
      : 0

  return {
    pushDegree,
    rpm,
  }
}
