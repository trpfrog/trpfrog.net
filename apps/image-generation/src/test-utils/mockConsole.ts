import { vi } from 'vitest'

type ConsoleMethod = 'error' | 'warn' | 'log'

export function silenceConsole(...methods: ConsoleMethod[]) {
  const uniqueMethods = [...new Set(methods)]
  const spies = uniqueMethods.map(method => vi.spyOn(console, method).mockImplementation(() => {}))

  return () => {
    spies.forEach(spy => spy.mockRestore())
  }
}
