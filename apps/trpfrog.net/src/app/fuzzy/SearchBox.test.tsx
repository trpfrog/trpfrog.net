import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { SearchBox } from './SearchBox'

describe('SearchBox', () => {
  beforeEach(() => {
    vi.stubGlobal('location', { href: 'http://localhost/fuzzy' })
  })

  it('opens the fuzzy page for the typed string', async () => {
    render(<SearchBox />)
    fireEvent.change(screen.getByRole('textbox', { name: 'https://trpfrog.net/fuzzy/' }), {
      target: { value: 'つまみ/x' },
    })
    await act(async () => {
      screen.getByRole('button', { name: 'Go' }).click()
    })
    expect(window.location.href).toBe(`https://trpfrog.net/fuzzy/${encodeURIComponent('つまみ/x')}`)
  })

  it('stays put when the field is empty', async () => {
    render(<SearchBox />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Go' }))
    })
    expect(window.location.href).toBe('http://localhost/fuzzy')
  })
})
