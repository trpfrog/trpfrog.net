import type { ExtraCodeBlockComponentName } from '@blog/_components/OriginalMarkdownComponent'

function isUtilityCodeBlock(name: string): boolean {
  const ignoreTarget: string[] = [
    'twitter',
    'ignore-read-count',
  ] satisfies ExtraCodeBlockComponentName[]
  return !ignoreTarget.includes(name)
}

export function computeReadTimeSecondFrom(markdown: string) {
  const imageRegex = new RegExp('!\\[(.*?)]\\(.*?\\)', 'g')
  const linkRegex = new RegExp('[^!]\\[(.*?)]\\(.*?\\)', 'g')
  const linkRemoved = markdown.replace(linkRegex, '$1')

  const codeBlockStack: string[] = []
  const getStackTop = () => {
    if (codeBlockStack.length > 0) {
      return codeBlockStack[codeBlockStack.length - 1]
    } else {
      return undefined
    }
  }

  let numOfCharacters: number = 0
  let addtionalSeconds: number = 0
  let enableWordCounting = true

  const imagePoint = 10

  for (let line of linkRemoved.split('\n')) {
    // code block
    if (line.startsWith('```')) {
      const cmd = line.replaceAll('`', '').trim()
      if (cmd.length > 0) {
        if (isUtilityCodeBlock(cmd)) {
          codeBlockStack.push(cmd)
        } else {
          codeBlockStack.push('code-block')
        }
      } else if (codeBlockStack.length > 0) {
        codeBlockStack.pop()
      }
      continue
    }

    if (codeBlockStack.includes('code-block')) {
      continue
    }

    const commentRegex = /^<!--+ ?(.*) ?--+>/
    if (commentRegex.test(line)) {
      const content = commentRegex.exec(line)![1].trim()

      if (content.includes('disable read-count')) {
        enableWordCounting = false
      } else if (content.includes('enable read-count')) {
        enableWordCounting = true
      } else if (content.includes('add-read-time-seconds')) {
        const sec = parseFloat(
          content.replace('add-read-time-seconds', '').trim(),
        )
        addtionalSeconds += Number.isNaN(sec) ? 0 : sec
      }
      continue
    }

    if (line.includes('<style>')) {
      enableWordCounting = false
    } else if (line.includes('</style>')) {
      enableWordCounting = true
    }

    if (!enableWordCounting) {
      continue
    }

    if (getStackTop() === 'twitter-archived') {
      if (line.startsWith('tweet:')) {
        line = line.slice(7)
      } else if (line.startsWith('image:')) {
        // console.log('found image!');
        numOfCharacters += imagePoint
        continue
      } else {
        continue
      }
    }

    if (line.startsWith('<iframe')) {
      continue
    }

    if (line.match(imageRegex)) {
      // console.log('found image!');
      numOfCharacters += imagePoint
      continue
    }

    // console.log(line);
    numOfCharacters += line.length
  }

  return Math.floor((numOfCharacters * 60) / 700) + addtionalSeconds
}
