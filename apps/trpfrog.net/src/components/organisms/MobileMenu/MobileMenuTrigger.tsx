import { PopoverTrigger } from '@ui-sdk/react/popover'

import { HamburgerIcon } from '@/components/atoms/HamburgerIcon'

import { mobileMenuController } from './controller'

export function MobileMenuTrigger() {
  return (
    <div className="tw:inline-grid tw:place-items-center">
      <PopoverTrigger
        controller={mobileMenuController}
        className="tw:z-199 tw:cursor-pointer"
        aria-label="メニュー"
      >
        {({ open }) => <HamburgerIcon open={open} />}
      </PopoverTrigger>
    </div>
  )
}
