import { createElement } from 'react'

import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { usePageTitle } from './usePageTitle'

function setTitleElement(text: string) {
  document.head.querySelector('title')?.remove()
  const title = document.createElement('title')
  title.textContent = text
  document.head.append(title)
}

describe('usePageTitle', () => {
  afterEach(() => {
    // setup の cleanup より先に動くため、フックをアンマウントしてから <title> を消す
    cleanup()
    document.head.querySelector('title')?.remove()
  })

  it('returns the page name without the site name', () => {
    setTitleElement('Stickers - つまみネット')
    const { result } = renderHook(usePageTitle)
    expect(result.current).toBe('Stickers')
  })

  it('returns the whole title when it has no site name', () => {
    setTitleElement('つまみネット')
    const { result } = renderHook(usePageTitle)
    expect(result.current).toBe('つまみネット')
  })

  it('follows a change to the title text', async () => {
    setTitleElement('Links - つまみネット')
    const { result } = renderHook(usePageTitle)

    document.title = 'Stickers - つまみネット'
    await waitFor(() => expect(result.current).toBe('Stickers'))
  })

  it('follows the title element being replaced', async () => {
    setTitleElement('Links - つまみネット')
    const { result } = renderHook(usePageTitle)

    setTitleElement('Stickers - つまみネット')
    await waitFor(() => expect(result.current).toBe('Stickers'))
  })

  it('renders an empty string on the server, where the title is unknown', () => {
    setTitleElement('Stickers - つまみネット')
    function Probe() {
      return usePageTitle()
    }
    expect(renderToString(createElement(Probe))).toBe('')
  })
})
