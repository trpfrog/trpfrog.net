export function addTwModifier(modifier: `${string}:`, className: string | string[]): string {
  if (Array.isArray(className)) {
    className = className.join(' ')
  }
  return className
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(c => {
      const mods = c.split(':')
      mods.splice(-1, 0, modifier.slice(0, -1))
      return mods.join(':')
    })
    .join(' ')
}
