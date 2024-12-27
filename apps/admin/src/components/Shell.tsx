'use client'

import { AppShell, Burger, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { usePathname } from 'next/navigation'

import { navigations } from '@/navigations'

export function Shell(props: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const currentPath = usePathname()

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 120,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex items-center gap-2 px-2 md:px-4">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div className="text-2xl font-bold">admin.trpfrog.net</div>
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
