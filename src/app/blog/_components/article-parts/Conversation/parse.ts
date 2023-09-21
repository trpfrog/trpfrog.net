/**
 * Parse a conversation notation into ConversationRecord
 *
 * @example
 * speaker: comment  ← outOfComment
 * speaker:
 * comment  ← outOfComment
 * speaker: comment  ← outOfComment
 *
 * => { speaker: string, comment: string, outOfComment: string }[]
 *
 * @param rawText colon separated conversation notation
 */

export type ConversationRecord = {
  speaker: string
  comment: string
  outOfComment?: string
}

export function parseConversation(rawText: string): ConversationRecord[] {
  const lines = rawText.trim().split('\n')

  const rawRecords = lines.reduce<string[]>((arr, line) => {
    if (line.includes(':')) {
      arr.push(line)
    } else if (arr.length > 0) {
      arr[arr.length - 1] += '\n' + line
    }
    return arr
  }, [])

  return rawRecords.map(line => {
    const [speaker, ...splitComments] = line.split(':')
    let comment = splitComments.join(':')

    let outOfComment = ''
    const leftArrowIdentifier = '  ←' // 2 spaces before left arrow
    if (comment.includes(leftArrowIdentifier)) {
      ;[comment, outOfComment] = comment.split(leftArrowIdentifier)
    }

    return {
      speaker,
      comment: comment.trim(),
      outOfComment: outOfComment?.trim() || undefined,
    } satisfies ConversationRecord
  })
}
