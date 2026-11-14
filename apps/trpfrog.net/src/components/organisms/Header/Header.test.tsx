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
  return screen.getByRole('button', { name: /メニュー/ })
}

function queryMenuLinks() {
  return NAVIGATION_LINKS.map(({ name }) => screen.queryByRole('link', { name }))
}

async function openMenu() {
  await act(async () => {
    getMenuButton().click()
  })
}

describe('Header mobile menu', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('keeps the menu links hidden until the menu button is pressed', async () => {
    await renderHeader()
    expect(queryMenuLinks().every(link => link === null)).toBe(true)

    await openMenu()

    for (const link of queryMenuLinks()) {
      expect(link).toBeInTheDocument()
    }
  })

  it('links every navigation entry to its page', async () => {
    await renderHeader()
    await openMenu()

    for (const { name, link } of NAVIGATION_LINKS) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', link)
    }
  })

  it('reports the open state on the menu button', async () => {
    await renderHeader()
    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'false')

    await openMenu()

    expect(getMenuButton()).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes when the menu button is pressed again', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      getMenuButton().click()
    })

    expect(queryMenuLinks().every(link => link === null)).toBe(true)
  })

  it('closes with Escape and returns focus to the menu button', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' })
    })

    expect(queryMenuLinks().every(link => link === null)).toBe(true)
    expect(getMenuButton()).toHaveFocus()
  })

  it('closes when a link in the menu is followed', async () => {
    await renderHeader()
    await openMenu()

    await act(async () => {
      screen.getByRole('link', { name: NAVIGATION_LINKS[1].name }).click()
    })

    expect(queryMenuLinks().every(link => link === null)).toBe(true)
  })

  it('moves focus into the menu when it opens', async () => {
    await renderHeader()
    await openMenu()

    const menu = screen.getByRole('dialog', { name: 'メニュー' })
    expect(menu).toContainElement(document.activeElement as HTMLElement)
  })

  it('shows the header settings inside the menu', async () => {
    await renderHeader()
    await openMenu()

    const menu = screen.getByRole('dialog', { name: 'メニュー' })
    expect(within(menu).getByText('高度な設定')).toBeInTheDocument()
    expect(within(menu).getByRole('checkbox', { name: 'ヘッダを追従させる' })).toBeInTheDocument()
  })
})
