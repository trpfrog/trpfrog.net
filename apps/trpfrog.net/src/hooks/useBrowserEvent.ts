import { useEffect } from 'react'

export type BrowserTarget = 'window' | 'document' | React.RefObject<HTMLElement>

type EventMapFor<T extends BrowserTarget> = T extends 'window'
  ? WindowEventMap
  : T extends 'document'
    ? DocumentEventMap
    : T extends React.RefObject<unknown>
      ? HTMLElementEventMap
      : never

type ThisFor<T extends BrowserTarget> = T extends 'window'
  ? Window
  : T extends 'document'
    ? Document
    : T extends React.RefObject<infer U>
      ? U
      : never

export function useBrowserEvent<T extends BrowserTarget, E extends keyof EventMapFor<T> & string>(
  target: T,
  eventName: E | (keyof WindowEventMap & keyof DocumentEventMap & keyof HTMLElementEventMap),
  handler: (this: ThisFor<T>, ev: EventMapFor<T>[E]) => unknown,
  options?: AddEventListenerOptions,
): void {
  useEffect(() => {
    let currentTarget: Window | Document | HTMLElement | null = null

    if (target === 'window') {
      currentTarget = window
    } else if (target === 'document') {
      currentTarget = document
    } else {
      currentTarget = target.current
    }

    if (!currentTarget) return

    // Define a properly typed event listener
    const eventListener = (event: Event) => {
      handler.call(currentTarget as ThisFor<T>, event as EventMapFor<T>[E])
    }

    currentTarget.addEventListener(eventName, eventListener, options)

    // Cleanup the event listener on unmount or when dependencies change
    return () => {
      currentTarget?.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, handler, options, target])
}
