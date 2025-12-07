'use client'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CircleButton } from '@/components/atoms/CircleButton'

import { tv } from '@/lib/tailwind/variants'

const style = tv({
  base: 'tw:fixed tw:bottom-7 tw:right-7 tw:print:hidden tw:sp:hidden',
})()

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function BackToTop() {
  return (
    <CircleButton className={style} onClick={backToTop}>
      <FontAwesomeIcon icon={faAngleDoubleUp} />
    </CircleButton>
  )
}
