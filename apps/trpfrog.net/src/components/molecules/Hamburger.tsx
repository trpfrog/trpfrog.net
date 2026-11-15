import { PopoverTrigger } from '@ui-sdk/react/popover'

import { HamburgerIcon } from '@/components/atoms/HamburgerIcon'

export function Hamburger() {
  return (
    <div className="tw:inline-grid tw:place-items-center">
      <PopoverTrigger className="tw:z-199 tw:cursor-pointer" aria-label="メニュー">
        {({ open }) => <HamburgerIcon open={open} />}
      </PopoverTrigger>
    </div>
  )
}
