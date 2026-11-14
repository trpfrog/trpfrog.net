import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { PageNavigation } from './PageNavigation'

const createPath = (pageNo: number) => `/blog/x/${pageNo}`

function pageLinks() {
  return screen
    .getAllByRole('link')
    .map(link => link.textContent)
    .filter(text => /^\d+$/.test(text ?? ''))
}

describe('PageNavigation', () => {
  it('links every page when there are only a few', () => {
    render(<PageNavigation currentPage={2} lastPage={4} createPath={createPath} />)
    expect(pageLinks()).toEqual(['1', '2', '3', '4'])
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/blog/x/3')
  })

  it('jumps by powers of two around the current page when there are many', () => {
    render(<PageNavigation currentPage={20} lastPage={100} createPath={createPath} />)
    expect(pageLinks()).toEqual([
      '1',
      '5',
      '13',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '27',
      '35',
      '51',
      '83',
      '100',
    ])
  })

  it('marks the current page', () => {
    render(<PageNavigation currentPage={2} lastPage={4} createPath={createPath} />)
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: '3' })).not.toHaveAttribute('aria-current')
  })

  it('links the previous and next pages', () => {
    render(
      <PageNavigation currentPage={2} lastPage={4} createPath={createPath} showNextPrevButtons />,
    )
    expect(screen.getByRole('link', { name: '前のページ' })).toHaveAttribute('href', '/blog/x/1')
    expect(screen.getByRole('link', { name: '次のページ' })).toHaveAttribute('href', '/blog/x/3')
  })

  it('does not link past either end', () => {
    render(
      <PageNavigation currentPage={1} lastPage={1} createPath={createPath} showNextPrevButtons />,
    )
    for (const name of ['前のページ', '次のページ']) {
      const step = screen.getByRole('link', { name })
      expect(step).not.toHaveAttribute('href')
      expect(step).toHaveAttribute('aria-disabled', 'true')
    }
  })
})
