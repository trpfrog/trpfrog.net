import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { motionValue } from 'motion'
import { useScroll } from 'motion/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { NAVIGATION_LINKS } from '@/components/organisms/Navigation'

import { Header } from './Header'

vi.mock('motion/react', async importOriginal => ({
  ...(await importOriginal<typeof import('motion/react')>()),
  useScroll: vi.fn<typeof useScroll>(),
}))
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('@/hooks/useScrollPosition', () => ({ useScrollPosition: () => ({ y: 0 }) }))
vi.mock('@/hooks/useWindowSize', () => ({ useWindowSize: () => ({ width: 1200 }) }))

async function renderHeader() {
  vi.mocked(useScroll).mockReturnValue({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
  })
  const view = render(
    <Provider store={createStore()}>
      <Header />
    </Provider>,
  )
  await act(async () => {})
  return view
}

function getMenuButton() {
  return screen.getByRole('button', { name: 'メニュー' })
}

function queryMenu() {
  return screen.queryByRole('dialog', { name: 'メニュー' })
}

function getMenu() {
  return screen.getByRole('dialog', { name: 'メニュー' })
}

function getHeaderWrapper() {
  const wrapper = screen.getByRole('banner').parentElement
  if (!wrapper) throw new Error('header wrapper not found')
  return wrapper
}

async function openMenu() {
  await act(async () => {
    getMenuButton().click()
  })
  return getMenu()
}

async function openSettings(menu: HTMLElement) {
  await act(async () => {
    within(menu).getByText('高度な設定').click()
  })
}

describe('Header mobile menu', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('stays closed until the menu button is pressed', async () => {
    await renderHeader()
    expect(queryMenu()).toBeNull()
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')

    await openMenu()

    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'true')
  })

  it('links every navigation entry to its page', async () => {
    await renderHeader()
    const menu = await openMenu()

    for (const { name, link } of NAVIGATION_LINKS) {
      expect(within(menu).getByRole('link', { name })).toHaveAttribute('href', link)
    }
  })

  it('moves focus into the menu when it opens', async () => {
    await renderHeader()
    const menu = await openMenu()

    expect(menu).toContainElement(document.activeElement as HTMLElement)
  })

  it('closes when the menu button is pressed again', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      getMenuButton().click()
    })

    expect(queryMenu()).toBeNull()
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes with Escape and returns focus to the menu button', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' })
    })

    expect(queryMenu()).toBeNull()
    expect(getMenuButton()).toHaveFocus()
  })

  it('closes on a press outside the menu', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      fireEvent.pointerDown(document.body)
      fireEvent.mouseDown(document.body)
      fireEvent.pointerUp(document.body)
      fireEvent.click(document.body)
    })

    expect(queryMenu()).toBeNull()
  })

  it('closes when a link in the menu is followed', async () => {
    await renderHeader()
    const menu = await openMenu()

    await act(async () => {
      within(menu).getByRole('link', { name: NAVIGATION_LINKS[1].name }).click()
    })

    expect(queryMenu()).toBeNull()
  })

  it('keeps the header pinned to the top while the menu is open', async () => {
    localStorage.setItem('shouldFollowHeader', 'false')
    await renderHeader()
    expect(getHeaderWrapper()).not.toHaveClass('tw:sticky')

    await openMenu()
    expect(getHeaderWrapper()).toHaveClass('tw:sticky')
    expect(getHeaderWrapper()).not.toHaveClass('tw:-translate-y-full')

    await act(async () => {
      getMenuButton().click()
    })
    expect(getHeaderWrapper()).not.toHaveClass('tw:sticky')
  })

  it('toggles the kawaii logo setting from the menu', async () => {
    await renderHeader()
    const menu = await openMenu()
    await openSettings(menu)

    const kawaii = within(menu).getByRole('checkbox', { name: /かわいいロゴモード/ })
    expect(kawaii).not.toBeChecked()

    await act(async () => {
      kawaii.click()
    })

    expect(kawaii).toBeChecked()
    expect(localStorage.getItem('kawaii-logo')).toBe('true')
  })

  it('disables hiding the header while the header does not follow the page', async () => {
    await renderHeader()
    const menu = await openMenu()
    await openSettings(menu)

    const follow = within(menu).getByRole('checkbox', { name: 'ヘッダを追従させる' })
    const hide = within(menu).getByRole('checkbox', { name: 'スクロール時ヘッダを隠す' })
    expect(follow).toBeChecked()
    expect(hide).toBeEnabled()

    await act(async () => {
      follow.click()
    })

    expect(follow).not.toBeChecked()
    expect(hide).toBeDisabled()
  })
})
