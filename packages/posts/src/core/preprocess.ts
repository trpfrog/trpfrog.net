// convert ((footnote)) to [^i]: footnote
// import {TextLintEngine} from "textlint";

import { BLOG_PAGE_NUMBER__ALL, BlogPageNumber } from './blogPost'

const parseFootnote = (content: string) => {
  const regex = new RegExp('\\(\\(.*\\)\\)', 'g')
  const footnotes = content.match(regex) ?? []

  if (footnotes.length < 1) return content

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

// const applyTextlint = async (content: string) => {
//   if (process.env.NODE_ENV === 'production' || true) {
//     return content
//   }
//
//   const engine = new TextLintEngine({
//     configFile: '.textlintrc'
//   });
//
//   const resultsList = await engine.executeOnText(content)
//   const lines = content.split('\n')
//   const ignoreText = '<!-- ignore textlint --->'
//   const ignoreLines = lines.map((e, i) => e.trim() === ignoreText ? i + 1 : -1).filter(e => e !== -1)
//
//   if (resultsList && engine.isErrorResults(resultsList)) {
//     const result = resultsList[0]
//     const output = engine.formatResults(resultsList)
//     console.log(output);
//     result.messages.forEach(({message, line}) => {
//       if (!ignoreLines.includes(line - 1) && !lines[line - 1].trim().startsWith("![")) {
//         const underlined = (`
//                         <span style="background:linear-gradient(transparent 60%, pink 60%);">
//                             ${lines[line - 1]}
//                         </span>
//                     `)
//         const errorMessage = (`
//                         <span style="color: red"><b>(textlint error: ${message})</b></span>
//                     `)
//         lines[line - 1] = underlined + ' ' + errorMessage
//       }
//     })
//     content = lines.join('\n')
//   }
//   return content
// }

/**
 * Split markdown using <!-- page break --> and <!-- window break -->
 * @param markdown
 * @param options
 */
export const preprocess = (
  markdown: string,
  pageIdx1Indexed: BlogPageNumber = BLOG_PAGE_NUMBER__ALL,
): string[] => {
  const pageBreakRegex = /<!--+ page break --+>/g
  const windowBreakRegex = /<!--+ window break --+>/g
  const beginHeadRegex = /<!--+ begin head --+>/g
  const endHeadRegex = /<!--+ end head --+>/g

  let head = ''
  if (markdown.match(beginHeadRegex) && markdown.match(endHeadRegex)) {
    const [beforeHead, tmp] = markdown.split(beginHeadRegex)
    const [_head, afterHead] = tmp.split(endHeadRegex)
    head = _head
    markdown = beforeHead + afterHead
  }

  // Replace <!-- page break --> with <!-- window break --> to concatenate all pages
  if (pageIdx1Indexed === 'all') {
    markdown = markdown
      .split(pageBreakRegex)
      .map((content, idx) => `<span id="original-page-${idx + 1}"/>\n${content}`)
      .join('<!-- window break -->')
  }

  const targetPageIdx = pageIdx1Indexed === 'all' ? 0 : (pageIdx1Indexed ?? 1) - 1

  const page = head + markdown.split(pageBreakRegex)[targetPageIdx]

  return page.split(windowBreakRegex).map(parseFootnote)
}
