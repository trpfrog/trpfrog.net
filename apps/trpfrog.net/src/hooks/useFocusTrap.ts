import { RefObject, useEffect } from 'react'

import { createFocusTrap } from 'focus-trap'

type OneOrMore<T> = T | T[]

export function useFocusTrap(
  containerRef: OneOrMore<RefObject<HTMLElement | null>>,
  enabled: boolean = true, // Whether the trap is active
  onRequestClose?: () => void,
): void {
  useEffect(() => {
    const refArr = Array.isArray(containerRef) ? containerRef : [containerRef]

    const elements = refArr
      .filter((ref): ref is RefObject<HTMLElement> => !!ref.current)
      .map(ref => ref.current)

    if (elements.length === 0) return

    const focusTrap = createFocusTrap(elements, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      returnFocusOnDeactivate: true,
      onDeactivate: onRequestClose,
    })

    if (enabled) {
      focusTrap.activate()
    }

    return () => {
      focusTrap.deactivate()
    }
  }, [containerRef, enabled, onRequestClose])
}
