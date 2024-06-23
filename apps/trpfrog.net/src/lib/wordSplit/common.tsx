export function parseUsingBudouxParser(budouxParser: (text: string) => string[], text: string) {
  const separator = '<%FORCE-BREAK%>'
  return budouxParser(text)
    .join(separator)
    .replaceAll('+', `${separator}+${separator}`)
    .replaceAll('(' + separator, '(')
    .replaceAll(separator + ')', ')')
    .replaceAll('(', separator + '(')
    .replaceAll(')', ')' + separator)
    .replaceAll(' ', '\u00a0') // &nbsp;
    .split(separator)
    .filter(Boolean)
}

export function BudouXCommon(props: { text: string; parser: (text: string) => string[] }) {
  return parseUsingBudouxParser(props.parser, props.text).map((word, i) => (
    <span key={i} style={{ display: 'inline-block' }}>
      {word}
    </span>
  ))
}
