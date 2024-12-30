'use client'

import { AppShell, Burger, NavLink } from '@mantine/core'
import { Flex, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PrimitiveAtom, useAtom } from 'jotai'
import { usePathname } from 'next/navigation'

import { Logout } from './Logout'

import {
  contentServerOriginAtom,
  imageGenerationOriginAtom,
  websiteOriginAtom,
  initialValues,
} from '@/atom/origin'
import { navigations } from '@/navigations'

function EndpointInput(props: {
  label: string
  initialValue: string
  atom: PrimitiveAtom<string>
}) {
  const [value, setValue] = useAtom(props.atom)
  return (
    <TextInput
      label={props.label}
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      ref={ref => {
        const handleFocusOut = () => {
          if (ref?.value === '') {
            setValue(props.initialValue)
          }
        }
        ref?.addEventListener('focusout', handleFocusOut)
        return () => {
          ref?.removeEventListener('focusout', handleFocusOut)
        }
      }}
    />
  )
}

export function Shell(props: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const currentPath = usePathname()

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="flex items-center justify-between gap-2 px-2 md:px-4">
        <div className="flex items-center gap-2">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="text-2xl font-bold">admin.trpfrog.net</div>
        </div>
        <Logout />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div>
          {navigations.map(nav => (
            <NavLink
              key={nav.path}
              href={nav.path}
              active={nav.path === currentPath}
              label={nav.displayName}
            />
          ))}
        </div>
        <Flex my="lg" px="xs" direction="column" gap="sm">
          <EndpointInput
            label="trpfrog.net BFF"
            atom={websiteOriginAtom}
            initialValue={initialValues.websiteOrigin}
          />
          <EndpointInput
            label="Image Generation Service"
            atom={imageGenerationOriginAtom}
            initialValue={initialValues.imageGenerationOrigin}
          />
          <EndpointInput
            label="Content Server"
            atom={contentServerOriginAtom}
            initialValue={initialValues.contentServerOrigin}
          />
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  )
}
