export function normalizeLangName(name: string) {
  switch (name.toLowerCase()) {
    case 'javascript':
    case 'js':
      return 'JavaScript'
    case 'typescript':
    case 'ts':
      return 'TypeScript'
    case 'sh':
      return 'Shell'
    case 'html':
    case 'yaml':
    case 'css':
    case 'scss':
    case 'tsx':
    case 'jsx':
    case 'json':
      return name.toUpperCase()
    default:
      return name.charAt(0).toUpperCase() + name.slice(1)
  }
}
