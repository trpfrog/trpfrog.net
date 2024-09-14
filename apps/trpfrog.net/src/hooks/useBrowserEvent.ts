import { useEffect } from 'react'

// window
export function useBrowserEvent<T extends 'window', E extends keyof WindowEventMap>(
  target: 'window',
  eventName: E,
  handler: (this: T, ev: WindowEventMap[E]) => unknown,
  options?: AddEventListenerOptions,
): void

// document
export function useBrowserEvent<T extends 'document', E extends keyof DocumentEventMap>(
  target: 'document',
  eventName: E,
  handler: (this: T, ev: DocumentEventMap[E]) => unknown,
  options?: AddEventListenerOptions,
): void

// ref
export function useBrowserEvent<T extends HTMLElement, E extends keyof HTMLElementEventMap>(
  target: React.RefObject<T>,
  eventName: E,
  handler: (this: T, ev: HTMLElementEventMap[E]) => unknown,
  options?: AddEventListenerOptions,
): void

export function useBrowserEvent<T extends HTMLElement>(
  target: 'window' | 'document' | React.RefObject<T>,
  eventName: string,
  handler: (this: Window | Document | HTMLElement, ev: Event) => unknown,
  options?: AddEventListenerOptions,
): void {
  useEffect(() => {
    let t
    if (target === 'window') {
      t = window
    } else if (target === 'document') {
      t = document
    } else {
      t = target.current
    }
    if (!t) return

    t.addEventListener(eventName, handler, options)
    return () => {
      t.removeEventListener(eventName, handler)
    }
  }, [eventName, handler, options, target])
}
