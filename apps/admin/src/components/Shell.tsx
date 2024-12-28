'use client'

import { AppShell, Burger, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { usePathname } from 'next/navigation'

import { Logout } from './Logout'

import { navigations } from '@/navigations'

export function Shell(props: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const currentPath = usePathname()

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 150,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex items-center justify-between gap-2 px-2 md:px-4">
        <div>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="text-2xl font-bold">admin.trpfrog.net</div>
        </div>
        <Logout />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navigations.map(nav => (
          <NavLink
            key={nav.path}
            href={nav.path}
            active={nav.path === currentPath}
            label={nav.displayName}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  )
}
