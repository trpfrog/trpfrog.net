import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { MdxDetails, MdxSummary } from './MdxDetails'

describe('MdxDetails', () => {
  it('uses the summary element as the toggle and the rest as the body', async () => {
    render(
      <MdxDetails>
        <MdxSummary>ランダムにならないって本当？</MdxSummary>
        <p>本文</p>
      </MdxDetails>,
    )
    const toggle = screen.getByRole('button', { name: 'ランダムにならないって本当？' })
    expect(screen.getByText('本文')).not.toBeVisible()

    await act(async () => {
      toggle.click()
    })

    expect(screen.getByText('本文')).toBeVisible()
    expect(screen.getAllByText('ランダムにならないって本当？')).toHaveLength(1)
  })

  it('falls back to a generic summary', () => {
    render(
      <MdxDetails>
        <p>本文</p>
      </MdxDetails>,
    )
    expect(screen.getByRole('button', { name: '詳細' })).toBeInTheDocument()
  })

  it('honours the open attribute', () => {
    render(
      <MdxDetails open>
        <MdxSummary>s</MdxSummary>
        <p>本文</p>
      </MdxDetails>,
    )
    expect(screen.getByText('本文')).toBeVisible()
  })
})
