import { act, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vite-plus/test'

import { LOREM_IPSUM } from '@/lib/constants'

import { Details } from '.'

async function toggle(name: string) {
  await act(async () => {
    screen.getByRole('button', { name }).click()
  })
}

describe('Details', () => {
  test('shows the summary as a collapsed button', () => {
    render(<Details summary="高度な設定">{LOREM_IPSUM}</Details>)
    expect(screen.getByRole('button', { name: '高度な設定' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByText(LOREM_IPSUM)).not.toBeVisible()
  })

  test('opens and closes when the summary is pressed', async () => {
    render(<Details summary="高度な設定">{LOREM_IPSUM}</Details>)

    await toggle('高度な設定')
    expect(screen.getByRole('button', { name: '高度な設定' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByText(LOREM_IPSUM)).toBeVisible()

    await toggle('高度な設定')
    expect(screen.queryByText(LOREM_IPSUM)).not.toBeVisible()
  })

  test('keeps closed content in the page for find in page', () => {
    render(<Details summary="summary">{LOREM_IPSUM}</Details>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })

  test('renders nothing inside until opened when lazy', async () => {
    render(
      <Details summary="summary" lazy>
        {LOREM_IPSUM}
      </Details>,
    )
    expect(screen.queryByText(LOREM_IPSUM)).toBeNull()

    await toggle('summary')
    expect(screen.getByText(LOREM_IPSUM)).toBeVisible()
  })

  test('starts open with defaultOpen', () => {
    render(
      <Details summary="summary" defaultOpen>
        {LOREM_IPSUM}
      </Details>,
    )
    expect(screen.getByText(LOREM_IPSUM)).toBeVisible()
  })
})
