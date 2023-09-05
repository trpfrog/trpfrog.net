import { myMarkdownClasses as partsDictionary } from '@blog/_components/OriginalMarkdownComponent'

export const getReadTimeSecond = (markdown: string) => {
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

  const utilityCodeBlocks = new Set(
    Object.keys(partsDictionary).map(e => e.toLowerCase()),
  )
  utilityCodeBlocks.delete('twitter')
  utilityCodeBlocks.delete('ignore-read-count')

  let numOfCharacters: number = 0
  let enableWordCounting = true

  const imagePoint = 10

  for (let line of linkRemoved.split('\n')) {
    // code block
    if (line.startsWith('```')) {
      const cmd = line.replaceAll('`', '').trim()
      if (cmd.length > 0) {
        if (utilityCodeBlocks.has(cmd)) {
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

    if (line.startsWith('<!--')) {
      if (line.includes('disable read-count')) {
        enableWordCounting = false
      } else if (line.includes('enable read-count')) {
        enableWordCounting = true
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

  return Math.floor((numOfCharacters * 60) / 700)
}

export const formatReadTime = (readTimeSec: number) => {
  let readMin = Math.floor(readTimeSec / 60)
  let readSec = Math.round((readTimeSec % 60) / 10) * 10
  if (readSec === 60) {
    readSec = 0
    readMin++
  }

  return {
    minutes: readMin.toString(),
    seconds: readSec !== 0 ? readSec.toString() : '00',
  }
}
