import { describe, expect, it } from 'vitest'

import { ImageUpdateStatus } from '../entities/image-update-status'

import { getRefreshedImageUpdateStatus } from './getRefreshedImageUpdateStatus'

describe('getRefreshedImageUpdateStatus', () => {
  const currentUnixTime = Date.now()
  const testCases: Array<{
    name: string
    status: ImageUpdateStatus
    expected: ImageUpdateStatus
  }> = [
    {
      name: '更新中のステータスが10分以上前の場合、idleを返すべき',
      status: { status: 'updating', startedAt: new Date(currentUnixTime - 11 * 60 * 1000) },
      expected: { status: 'idle' },
    },
    {
      name: '更新中のステータスが10分以内の場合、更新中のステータスを返すべき',
      status: { status: 'updating', startedAt: new Date(currentUnixTime - 5 * 60 * 1000) },
      expected: { status: 'updating', startedAt: new Date(currentUnixTime - 5 * 60 * 1000) },
    },
    {
      name: 'エラーステータスが60分以上前の場合、idleを返すべき',
      status: { status: 'error', occurredAt: new Date(currentUnixTime - 61 * 60 * 1000) },
      expected: { status: 'idle' },
    },
    {
      name: 'エラーステータスが60分以内の場合、エラーステータスを返すべき',
      status: { status: 'error', occurredAt: new Date(currentUnixTime - 30 * 60 * 1000) },
      expected: { status: 'error', occurredAt: new Date(currentUnixTime - 30 * 60 * 1000) },
    },
    {
      name: 'ステータスがidleの場合、idleを返すべき',
      status: { status: 'idle' },
      expected: { status: 'idle' },
    },
  ]

  testCases.forEach(({ name, status, expected }) => {
    it(name, () => {
      const result = getRefreshedImageUpdateStatus(status)
      expect(result).toEqual(expected)
    })
  })
})
