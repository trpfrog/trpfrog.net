import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { CodeLinkButton } from './PlainCodeBlock'

describe('CodeLinkButton', () => {
  it.each(['https://github.com/trpfrog/trpfrog.net', 'https://example.com/code.ts'])(
    'opens %s in a new tab',
    url => {
      render(<CodeLinkButton url={url} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', url)
      expect(link).toHaveAttribute('target', '_blank')
    },
  )

  it.each([
    { url: 'https://github.com/trpfrog/trpfrog.net', name: 'Open on GitHub' },
    { url: 'https://example.com/code.ts', name: 'View Code' },
  ])('names the icon-only link $name', ({ url, name }) => {
    render(<CodeLinkButton url={url} />)
    expect(screen.getByRole('link', { name })).toBeInTheDocument()
  })
})
