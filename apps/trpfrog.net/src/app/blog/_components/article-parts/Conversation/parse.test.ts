import { parseConversation } from '@blog/_components/article-parts/Conversation/parse'

describe('Conversation parse', () => {
  it('single', () => {
    const input = ['speaker: comment'].join('\n')
    const output = [{ speaker: 'speaker', comment: 'comment' }]
    expect(parseConversation(input)).toEqual(output)
  })

  test('single with outOfComment', () => {
    const input = ['speaker: comment  ← outOfComment'].join('\n')
    const output = [{ speaker: 'speaker', comment: 'comment', outOfComment: 'outOfComment' }]
    expect(parseConversation(input)).toEqual(output)
  })

  test('outOfComment spacing should be 2 or more', () => {
    const input = ['speaker: comment ← outOfComment'].join('\n')
    const output = [{ speaker: 'speaker', comment: 'comment ← outOfComment' }]
    expect(parseConversation(input)).toEqual(output)
  })

  test('comment can be empty', () => {
    const input = ['speaker:'].join('\n')
    const output = [{ speaker: 'speaker', comment: '' }]
    expect(parseConversation(input)).toEqual(output)
  })

  test('comment can be broken line', () => {
    const input = ['speaker:', 'comment1', 'comment2', 'comment3']
    const output = [{ speaker: 'speaker', comment: 'comment1\ncomment2\ncomment3' }]
    expect(parseConversation(input.join('\n'))).toEqual(output)
  })

  test('should trim input', () => {
    const input = ['', '  speaker:  comment  ←  outOfComment  ', '', ''].join('\n')
    const output = [{ speaker: 'speaker', comment: 'comment', outOfComment: 'outOfComment' }]
    expect(parseConversation(input)).toEqual(output)
  })

  test('multiple complex pattern', () => {
    const input = [
      'speaker1: comment1',
      'speaker2:',
      'comment2',
      'speaker3: comment3  ← outOfComment3',
      'speaker4: comment4  ← outOfComment4',
      'speaker5:',
      'comment5',
      'comment5',
      'comment5',
      'speaker6: comment6',
    ]
    const output = [
      { speaker: 'speaker1', comment: 'comment1' },
      { speaker: 'speaker2', comment: 'comment2' },
      {
        speaker: 'speaker3',
        comment: 'comment3',
        outOfComment: 'outOfComment3',
      },
      {
        speaker: 'speaker4',
        comment: 'comment4',
        outOfComment: 'outOfComment4',
      },
      { speaker: 'speaker5', comment: 'comment5\ncomment5\ncomment5' },
      { speaker: 'speaker6', comment: 'comment6' },
    ]
    expect(parseConversation(input.join('\n'))).toEqual(output)
  })
})
