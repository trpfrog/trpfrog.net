// convert ((footnote)) to [^i]: footnote
import {TextLintEngine} from "textlint";

const parseFootnote = (content: string) => {
  const regex = new RegExp('\\(\\(.*\\)\\)', 'g')
  const footnotes = content.match(regex) ?? []

  if (footnotes.length < 1) return content;

  const tmp = content.split(regex)
  content = ''
  for (const i in footnotes) {
    content += tmp[i] + `[^${parseInt(i, 10) + 1}]`
  }
  content += tmp[tmp.length - 1]

  for (const i in footnotes) {
    content += `\n[^${parseInt(i, 10) + 1}]: ${footnotes[i].slice(2, footnotes[i].length - 2)}`
  }

  return content
}

const applyTextlint = async (content: string) => {
  if (process.env.NODE_ENV === 'production' || true) {
    return content
  }

  const engine = new TextLintEngine({
    configFile: '.textlintrc'
  });

  const resultsList = await engine.executeOnText(content)
  const lines = content.split('\n')
  const ignoreText = '<!-- ignore textlint --->'
  const ignoreLines = lines.map((e, i) => e.trim() === ignoreText ? i + 1 : -1).filter(e => e !== -1)

  if (resultsList && engine.isErrorResults(resultsList)) {
    const result = resultsList[0]
    const output = engine.formatResults(resultsList)
    console.log(output);
    result.messages.forEach(({message, line}) => {
      if (!ignoreLines.includes(line - 1) && !lines[line - 1].trim().startsWith("![")) {
        const underlined = (`
                        <span style="background:linear-gradient(transparent 60%, pink 60%);">
                            ${lines[line - 1]}
                        </span>
                    `)
        const errorMessage = (`
                        <span style="color: red"><b>(textlint error: ${message})</b></span>
                    `)
        lines[line - 1] = underlined + ' ' + errorMessage
      }
    })
    content = lines.join('\n')
  }
  return content
}

const parse = async (markdown: string) => {
  let list = markdown
    .split('<!-- page break --->')
    .map(parseFootnote)
  list = await Promise.all(list.map(applyTextlint))
  return list.map(e => e.split('<!-- window break --->'))
}

export default parse;
