'use client'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@ui-sdk/react/button'

import { tv } from '@/lib/tailwind'

const style = tv({
  base: [
    'tw:fixed tw:bottom-7 tw:right-7 tw:print:hidden tw:sp:hidden',
    'tw:grid tw:size-[50px] tw:place-items-center tw:overflow-hidden tw:rounded-full',
    'tw:bg-(--header-color) tw:text-[25px] tw:font-black tw:text-white',
    'tw:backdrop-blur-[5px] tw:opacity-30 tw:transition tw:duration-200 tw:hover:opacity-100',
    'tw:focus-visible:opacity-100',
    'tw:shadow-[0_2px_10px_-6px_rgba(0,0,0,0.5),0_3px_10px_-4px_rgba(0,0,0,0.4)]',
  ],
})()

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function BackToTop() {
  return (
    <Button className={style} onClick={backToTop} aria-label="ページの先頭に戻る">
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </Button>
  )
}
