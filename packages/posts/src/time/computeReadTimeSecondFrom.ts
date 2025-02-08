import * as v from 'valibot'

const COUNTING_TARGET_CODE_BLOCK_NAMES = [
  'centering',
  'twitter-archived',
  'infobox',
  'caution',
  'titled-frame',
  'centering-with-size',
  'centering-with-size-bold',
  'horizontal-scroll',
  'show-all',
  'conversation',
]

export const ReadTimeOptionSchema = v.object({
  countingTargetCodeBlockNames: v.optional(v.array(v.string()), COUNTING_TARGET_CODE_BLOCK_NAMES),
})

export function computeReadTimeSecondFrom(
  markdown: string,
  _options?: v.InferInput<typeof ReadTimeOptionSchema>,
) {
  const options = v.parse(ReadTimeOptionSchema, _options ?? {})

  const imageRegex = new RegExp('!\\[(.*?)]\\(.*?\\)', 'g')
  const linkRegex = new RegExp('[^!]\\[(.*?)]\\(.*?\\)', 'g')
  const linkRemoved = markdown.replace(linkRegex, '$1')

  const wordCountingPreventer = Symbol('word-counting-preventer')
  const codeBlockStack: (string | typeof wordCountingPreventer)[] = []
  const getStackTop = () => {
    if (codeBlockStack.length > 0) {
      return codeBlockStack[codeBlockStack.length - 1]
    } else {
      return undefined
    }
  }

  let numOfCharacters: number = 0
  let addtionalSeconds: number = 0
  let manualEnableWordCounting = true
  let inStyleTag = false

  const isEnabledWordCounting = () => manualEnableWordCounting && !inStyleTag

  /**
   * コードブロックのスタックを記録しながら、各行の文字数を記録する
   * スタックに wordCountingPreventer が含まれている場合は、文字数をカウントしない
   */
  for (let line of linkRemoved.split('\n')) {
    // code block
    if (line.startsWith('```')) {
      const cmd = line.replaceAll('`', '').trim()
      if (cmd.length > 0) {
        if (options.countingTargetCodeBlockNames.includes(cmd)) {
          codeBlockStack.push(cmd)
        } else {
          codeBlockStack.push(wordCountingPreventer)
        }
      } else if (codeBlockStack.length > 0) {
        codeBlockStack.pop()
      }
      continue
    }

    if (codeBlockStack.includes(wordCountingPreventer)) {
      continue
    }

    const commentRegex = /^<!--+ ?(.*) ?--+>/
    const content = commentRegex.exec(line)?.[1]?.trim()
    if (content) {
      if (content.includes('disable read-count')) {
        manualEnableWordCounting = false
      } else if (content.includes('enable read-count')) {
        manualEnableWordCounting = true
      } else if (content.includes('add-read-time-seconds')) {
        const sec = parseFloat(content.replace('add-read-time-seconds', '').trim())
        addtionalSeconds += Number.isNaN(sec) ? 0 : sec
      }
      continue
    }

    if (line.includes('<style>')) {
      inStyleTag = true
    } else if (line.includes('</style>')) {
      inStyleTag = false
    }

    if (!isEnabledWordCounting()) {
      continue
    }

    if (getStackTop() === 'twitter-archived') {
      if (line.startsWith('tweet:')) {
        line = line.slice(7)
      } else if (/^image[234]?:.*/.test(line)) {
        addtionalSeconds += 1
        continue
      } else {
        continue
      }
    }

    if (line.startsWith('<iframe')) {
      continue
    }

    if (line.match(imageRegex)) {
      addtionalSeconds += 1
      continue
    }

    line = line
      .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/<(.+?)>/g, '')
      .replace(/https?:\/\/.*?(\s|$)/g, '')
      .replace(/|-+/g, '')
      .replace(/[.…,。、:~〜！？!?\-()「」]/g, '')
      .replace(/^#+/, '')
      .replace(/\s/g, '')
      .trim()

    numOfCharacters += line.length
  }

  const CHARACTERS_PER_MINUTE = 700
  const CHARACTERS_PER_SECOND = CHARACTERS_PER_MINUTE / 60.0
  return Math.floor(numOfCharacters / CHARACTERS_PER_SECOND) + addtionalSeconds
}
